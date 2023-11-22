import { TabList } from "@mui/lab";
import { Tab } from "@mui/material";

export const TAB_RECORD = "record";
export const TAB_LINEUP = "lineup";

const data = [
  { title: "기록", value: TAB_RECORD },
  { title: "라인업", value: TAB_LINEUP },
];
const MatchDetailTabs = ({ setSelectedTab }) => {
  return (
    <TabList
      aria-label="lab API tabs example"
      onChange={(e, newValue) => {
        setSelectedTab(newValue);
      }}
    >
      {data.map(({ title, value }) => (
        <Tab index={value} value={value} sx={{ color: "black" }} label={title} />
      ))}
    </TabList>
  );
};

export default MatchDetailTabs;
