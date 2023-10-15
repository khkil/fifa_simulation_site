import { TRADE_TYPES } from "@/constants";
import { Box, Tab, Tabs } from "@mui/material";

const TrabeTypeTabs = ({ tradeType, setTradeType }) => {
  return (
    <Box sx={{ width: "100%" }}>
      <Tabs
        value={tradeType}
        onChange={(_, value) => {
          setTradeType(value);
        }}
        aria-label="nav tabs example"
      >
        {TRADE_TYPES.map(({ type, desc }) => (
          <Tab key={type} label={desc} value={type} />
        ))}
      </Tabs>
    </Box>
  );
};

export default TrabeTypeTabs;
