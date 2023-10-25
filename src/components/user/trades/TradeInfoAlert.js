import { TRADE_TYPE_BUY, TRADE_TYPE_SELL } from "@/constants";
import { convertPriceFormat } from "@/utils";
import { Alert, Box, Typography } from "@mui/material";
import { useMemo } from "react";

const TradeInfoAlert = ({ tradeList }) => {
  const { buyProfit, buyPrice, sellProfit, sellPrice } = useMemo(
    () => ({
      buyProfit: tradeList
        .filter(({ tradeType }) => tradeType === TRADE_TYPE_BUY)
        .reduce((currentValue, { value, recentPrice }) => recentPrice - value + currentValue, 0),
      buyPrice: tradeList.filter(({ tradeType }) => tradeType === TRADE_TYPE_BUY).reduce((currentValue, { value }) => value + currentValue, 0),

      sellProfit: tradeList
        .filter(({ tradeType }) => tradeType === TRADE_TYPE_SELL)
        .reduce((currentValue, { value, recentPrice }) => value - recentPrice + currentValue, 0),
      sellPrice: tradeList.filter(({ tradeType }) => tradeType === TRADE_TYPE_SELL).reduce((currentValue, { value }) => value + currentValue, 0),
    }),
    [tradeList]
  );

  return (
    <Box sx={{ mb: 2 }}>
      <Box sx={{ display: "flex" }}>
        <Alert sx={{ m: 1, width: "50%" }} severity="error">
          <Box sx={{ display: "flex", alignContent: "center" }}>
            <Typography sx={{ width: 180 }}> 총 구매 금액 </Typography>
            <Typography sx={{ fontWeight: "bold" }}>{convertPriceFormat(buyPrice)} BP</Typography>
          </Box>
          <Box sx={{ display: "flex", alignContent: "center" }}>
            <Typography sx={{ width: 180 }}> 구매 차익(현 시세대비)</Typography>
            <Typography sx={{ fontWeight: "bold" }}>
              {buyProfit > 0 ? "+" : ""}
              {convertPriceFormat(buyProfit)} BP
            </Typography>
          </Box>
        </Alert>
        <Alert sx={{ m: 1, width: "50%" }} severity="info">
          <Box sx={{ display: "flex", alignContent: "center" }}>
            <Typography sx={{ width: 180 }}> 총 판매 금액 </Typography>
            <Typography sx={{ fontWeight: "bold" }}>{convertPriceFormat(sellPrice)} BP</Typography>
          </Box>
          <Box sx={{ display: "flex", alignContent: "center" }}>
            <Typography sx={{ width: 180 }}> 판매 차익(현 시세대비)</Typography>
            <Typography sx={{ fontWeight: "bold" }}>
              {sellProfit > 0 ? "+" : ""}
              {convertPriceFormat(sellProfit)} BP
            </Typography>
          </Box>
        </Alert>
      </Box>
      <Alert sx={{ m: 1, mt: -0.5 }} severity="success">
        <Box sx={{ display: "flex", alignContent: "center" }}>
          <Typography sx={{ width: 180 }}> 합산 차익</Typography>
          <Typography sx={{ fontWeight: "bold" }}>
            {sellProfit + buyProfit > 0 ? "+" : ""} {convertPriceFormat(sellProfit + buyProfit)} BP
          </Typography>
        </Box>
      </Alert>
    </Box>
  );
};

export default TradeInfoAlert;
