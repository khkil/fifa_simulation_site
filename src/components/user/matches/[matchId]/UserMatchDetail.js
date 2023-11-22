import Loader from "@/components/common/Loader";
import { fetchUserMatcheDetail } from "@/services/userService";
import { TabContext, TabPanel } from "@mui/lab";
import { Box } from "@mui/material";
import { useState } from "react";
import { useQuery } from "react-query";
import MatchDetailTabs, { TAB_LINEUP, TAB_RECORD } from "./MatchDetailTabs";
import MatchRecods from "./info/MatchRecods";

const UserMatchDetail = ({ open, matchId }) => {
  const { data: matchDetail, isLoading } = useQuery(
    [`matchDetail_${matchId}`],
    () =>
      fetchUserMatcheDetail({
        matchId,
      }),
    {
      enabled: !!open,
    }
  );

  const [selectedTab, setSelectedTab] = useState(TAB_RECORD);

  return (
    <Box sx={{ margin: 1, minHeight: 300 }}>
      {isLoading ? (
        <Loader height={"100%"} />
      ) : (
        <Box>
          <TabContext value={selectedTab}>
            <MatchDetailTabs setSelectedTab={setSelectedTab} />
            <TabPanel value={TAB_RECORD}>
              <MatchRecods matchInfoList={matchDetail.matchInfo} />
            </TabPanel>
            <TabPanel value={TAB_LINEUP}>Item One</TabPanel>
          </TabContext>
        </Box>
      )}
    </Box>
  );
};

export default UserMatchDetail;
