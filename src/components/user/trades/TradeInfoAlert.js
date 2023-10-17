import { TRADE_TYPE_BUY, TRADE_TYPE_SELL } from "@/constants";
import { convertPriceFormat } from "@/utils";
import { Alert, Box } from "@mui/material";
import { useMemo } from "react";

const TradeInfoAlert = ({ tradeList }) => {
  const { buyPrice, sellPrice } = useMemo(
    () => ({
      buyPrice: tradeList
        .filter(({ tradeType }) => tradeType === TRADE_TYPE_BUY)
        .reduce((currentValue, { value, recentPrice }) => recentPrice - value + currentValue, 0),
      sellPrice: tradeList
        .filter(({ tradeType }) => tradeType === TRADE_TYPE_SELL)
        .reduce((currentValue, { value, recentPrice }) => value - recentPrice + currentValue, 0),
    }),
    [tradeList]
  );

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Alert sx={{ m: 1, width: "50%" }} severity="error">
          <h2>판매차익 </h2>
          {buyPrice > 0 ? "+" : ""} <strong>{convertPriceFormat(buyPrice)}</strong> BP
        </Alert>
        <Alert sx={{ m: 1, width: "50%" }} severity="info">
          <h2>구매차익 </h2>
          {sellPrice > 0 ? "+" : ""} <strong>{convertPriceFormat(sellPrice)}</strong> BP
        </Alert>
      </Box>
      <Alert sx={{ m: 1, mt: -0.5 }} severity="success">
        <h2>종합 </h2>
        {sellPrice + buyPrice > 0 ? "+" : ""} <strong>{convertPriceFormat(sellPrice + buyPrice)}</strong> BP
      </Alert>
    </>
  );
};

export default TradeInfoAlert;
