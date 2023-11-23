import { ToggleButton, ToggleButtonGroup } from "@mui/material";

export const TAB_RECORD = "record";
export const TAB_LINEUP = "lineup";

const data = [
  { title: "기록", value: TAB_RECORD },
  { title: "라인업", value: TAB_LINEUP },
];
const MatchDetailTabs = ({ selectedTab, setSelectedTab }) => {
  return (
    <ToggleButtonGroup value={selectedTab} color="info">
      {data.map(({ title, value }) => (
        <ToggleButton
          index={value}
          value={value}
          onClick={(e) => {
            setSelectedTab(value);
          }}
        >
          {title}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
};

export default MatchDetailTabs;
