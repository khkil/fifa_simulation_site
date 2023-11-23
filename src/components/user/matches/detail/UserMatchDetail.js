import Loader from "@/components/common/Loader";
import { fetchUserMatcheDetail } from "@/services/userService";
import { Box } from "@mui/material";
import { useState } from "react";
import { useQuery } from "react-query";
import MatchDetailTabs, { TAB_LINEUP, TAB_RECORD } from "./MatchDetailTabs";
import MatchLineup from "./info/MatchLineup";
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

  const [selectedTab, setSelectedTab] = useState(TAB_LINEUP);

  return (
    <Box sx={{ margin: 1, minHeight: 300 }}>
      {isLoading ? (
        <Loader height={"100%"} />
      ) : (
        <Box>
          <MatchDetailTabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />

          {selectedTab === TAB_RECORD ? (
            <MatchRecods matchInfoList={matchDetail.matchInfo} />
          ) : selectedTab === TAB_LINEUP ? (
            <MatchLineup matchInfoList={matchDetail.matchInfo} />
          ) : (
            <></>
          )}
        </Box>
      )}
    </Box>
  );
};

export default UserMatchDetail;
