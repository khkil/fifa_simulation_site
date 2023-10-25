import { TRADE_TYPES } from "@/constants";
import { sortedList } from "@/pages/user/trades";
import { useTheme } from "@emotion/react";
import { Box, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Tab, Tabs } from "@mui/material";
import { grey } from "@mui/material/colors";
import TradeInfoAlert from "./TradeInfoAlert";

const TrabeTypeSubHeader = ({ tradeList, tradeType, setTradeType, sort, setSort }) => {
  const theme = useTheme();

  return (
    <Box sx={{ width: "100%" }}>
      <TradeInfoAlert tradeList={tradeList}></TradeInfoAlert>
      <Box sx={{ display: "flex" }}>
        <Tabs
          value={tradeType}
          onChange={(_, value) => {
            setTradeType(value);
          }}
          indicatorColor="white"
        >
          {TRADE_TYPES.map(({ type, desc }) => (
            <Tab
              key={type}
              label={desc}
              value={type}
              sx={{ border: 1, borderColor: grey[300] }}
              style={{
                backgroundColor: type === tradeType ? theme.palette.primary.main : "white",
                color: type === tradeType ? "white" : grey[500],
              }}
            />
          ))}
        </Tabs>
        <FormControl sx={{ marginLeft: "auto" }}>
          <FormLabel id="demo-row-radio-buttons-group-label">정렬 순</FormLabel>
          <RadioGroup
            row
            onChange={(e) => {
              setSort(e.target.value);
            }}
          >
            {sortedList.map(({ name, value }) => (
              <FormControlLabel key={value} value={value} control={<Radio checked={value === sort} />} label={name} />
            ))}
          </RadioGroup>
        </FormControl>
      </Box>
    </Box>
  );
};

export default TrabeTypeSubHeader;
