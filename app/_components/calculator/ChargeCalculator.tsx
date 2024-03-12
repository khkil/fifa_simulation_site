"use client";

import { useMemo, useState } from "react";

export default function ChargeCalculator() {
  return (
    <div className={"w-full border border-gray-300 rounded-md p-3"}>
      <h2 className={"font-bold mb-5 text-xl"}>수수료 계산기</h2>
      <div className={"flex"}>
        <input
          type="number"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-4/5 p-2.5"
          placeholder="금액(BP) 입력"
          required
        />
        <input
          type="number"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-1/5 p-2.5"
          placeholder="쿠폰"
          required
        />
      </div>
      <div className={"flex my-5 justify-center items-center"}>
        <button type="button" className="text-white bg-primary font-medium rounded-lg text-sm py-2.5 mb-2 w-1/6" onClick={() => {}}>
          + 선수 추가
        </button>
      </div>
      <div className={"flex space-x-4"}>
        <button type="button" className="text-white bg-gray-700 font-medium rounded-lg text-sm py-2.5 mb-2 w-1/2" onClick={() => {}}>
          수수료 계산
        </button>
        <button type="button" className="text-white bg-gray-400 font-medium rounded-lg text-sm py-2.5  mb-2 w-1/2" onClick={() => {}}>
          초기화
        </button>
      </div>
    </div>
    /* <Paper elevation={16} sx={{ p: 3 }}>
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
    </Paper>*/
  );
}

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
            },
      ),
    );
  };

  return (
    <div>asd</div>
    /*   <ListItem>
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
    </ListItem>*/
  );
};
