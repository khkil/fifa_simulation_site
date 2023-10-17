import { TRADE_TYPES } from "@/constants";
import { Tab, Tabs } from "@mui/material";
import { grey } from "@mui/material/colors";

const TrabeTypeTabs = ({ tradeType, setTradeType }) => {
  return (
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
            backgroundColor: type === tradeType ? grey[500] : "white",
            color: type === tradeType ? "white" : grey[500],
          }}
        />
      ))}
    </Tabs>
  );
};

export default TrabeTypeTabs;
