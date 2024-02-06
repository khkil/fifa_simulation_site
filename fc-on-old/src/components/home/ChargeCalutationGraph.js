import { convertPriceFormat } from "@/utils";
import { Add } from "@mui/icons-material";
import { Box, Card, CardContent, IconButton, List, ListItem, Paper, TextField, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import { useMemo, useState } from "react";

const units = [
  {
    text: "원",
    value: 1,
  },
  {
    text: "만",
    value: 10000,
  },
  {
    text: "억",
    value: 100000000,
  },
  {
    text: "조",
    value: 1000000000000,
  },
];

const ChargeCalutationGraph = () => {
  const [priceList, setPriceList] = useState([
    {
      price: 0,
      coupon: 0,
      unit: 1,
    },
  ]);
  const [additionalDiscounts, setAdditionalDiscounts] = useState([]);

  const { totalPrice, totalCharge } = useMemo(() => {
    let totalPrice = 0;
    let totalCharge = 0;

    const defaultCharge = 40;
    const totalAdditionalDiscounts = additionalDiscounts.reduce((sum, v) => sum + Number(v), 0);

    priceList.forEach(({ price, coupon, unit }) => {
      totalPrice += price * unit;
      totalCharge += ((price * (defaultCharge - (defaultCharge * (coupon + totalAdditionalDiscounts)) / 100)) / 100) * unit;
    }, 0);

    return {
      totalPrice,
      totalCharge,
    };
  }, [priceList, additionalDiscounts]);

  const addPrice = () => {
    setPriceList([
      ...priceList,
      {
        price: 0,
        coupon: 0,
        unit: 1,
      },
    ]);
  };

  return (
    <Paper elevation={16} sx={{ p: 3 }}>
      <Typography variant="h5">수수료 계산기</Typography>
      <ToggleButtonGroup
        value={additionalDiscounts}
        sx={{ width: "100%", p: 1 }}
        color="info"
        onChange={(e, values) => {
          setAdditionalDiscounts(values);
        }}
      >
        <ToggleButton value="20" aria-label="left aligned" sx={{ width: "50%" }}>
          <Typography>Top Class</Typography>
          <Typography fontWeight={"bold"} sx={{ ml: 0.5 }}>
            (20%)
          </Typography>
        </ToggleButton>
        <ToggleButton value="30" aria-label="left aligned" sx={{ width: "50%" }}>
          <Typography>PC방 할인</Typography>
          <Typography fontWeight={"bold"} sx={{ ml: 0.5 }}>
            (30%)
          </Typography>
        </ToggleButton>
      </ToggleButtonGroup>
      <List component="nav" aria-label="mailbox folders">
        {priceList.map((_, index) => (
          <Price key={index} priceList={priceList} setpriceList={setPriceList} index={index} />
        ))}
      </List>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <IconButton size="large" onClick={addPrice}>
          <Add />
        </IconButton>
      </Box>
      <Card variant="outlined">
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            최종금액
          </Typography>
          <Typography sx={{ mb: 1 }} variant="h5" component="div">
            {convertPriceFormat(Math.ceil(totalPrice - totalCharge))} BP
          </Typography>
          <Typography color="text.secondary">판매금액 : {convertPriceFormat(Math.ceil(totalPrice))} BP</Typography>
          <Typography color="text.secondary">수수료 : {convertPriceFormat(Math.ceil(totalCharge))} BP</Typography>
        </CardContent>
      </Card>
    </Paper>
  );
};

const Price = ({ priceList, setpriceList, index }) => {
  const priceInfo = useMemo(() => priceList[index], [priceList]);

  const handleChange = (e) => {
    const maxDiscountPer = 50;
    let { name, value } = e.target;

    if (isNaN(value)) {
      return false;
    } else if (name === "coupon" && Number(e.target.value) > maxDiscountPer) {
      alert("수수료 쿠폰은 50%가 최대 입니다.");
      return false;
    }
    setpriceList(
      priceList.map((obj, x) =>
        x !== index
          ? obj
          : {
              ...obj,
              [name]: Number(value),
            }
      )
    );
  };

  return (
    <ListItem>
      <Box sx={{ display: "flex", width: "100%", height: 40 }}>
        <TextField size="small" name="price" sx={{ width: "60%", mr: 1 }} value={priceInfo.price} onChange={handleChange} label="선수 금액(BP)" />
        <TextField size="small" name="coupon" sx={{ width: "40%", mr: 1 }} value={priceInfo.coupon} onChange={handleChange} label="수수료 쿠폰" />
        <ToggleButtonGroup color="info" exclusive aria-label="text alignment" value={priceInfo.unit.toString()} onChange={handleChange}>
          {units.map(({ text, value }, index) => (
            <ToggleButton value={value.toString()} aria-label="left aligned" name="unit">
              {text}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Box>
    </ListItem>
  );
};

export default ChargeCalutationGraph;