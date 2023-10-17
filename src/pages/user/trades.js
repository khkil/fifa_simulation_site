import Loader from "@/components/common/Loader";
import CommonLayout from "@/components/layouts/CommonLayout";
import NicknameSearchBox from "@/components/user/NicknameSearchBox";
import TrabeTypeTabs from "@/components/user/trades/TrabeTypeTabs";
import TradeInfoAlert from "@/components/user/trades/TradeInfoAlert";
import TradeList from "@/components/user/trades/TradeList";
import { TRADE_TYPES } from "@/constants";
import { fetchUserTrades } from "@/services/userService";
import { Box, Container } from "@mui/material";
import { useMemo, useState } from "react";
import { useQuery } from "react-query";

const UserTradePage = ({ query }) => {
  const [tradeType, setTradeType] = useState(TRADE_TYPES[0].type);
  const enabled = useMemo(() => !!query.nickname, [query]);

  const { data, isLoading } = useQuery(
    ["userTrades", query.nickname],
    () =>
      fetchUserTrades({
        nickname: query.nickname,
        tradeType,
        offset: 0,
        limit: 100,
      }),
    {
      enabled,
    }
  );

  const tradeList = useMemo(() => data || [], [data]);

  return (
    <CommonLayout>
      <Container maxWidth="lg">
        <NicknameSearchBox nickname={query.nickname} />
        {enabled && (
          <>
            <TradeInfoAlert tradeList={tradeList} />
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box sx={{ width: "50%" }}>
                <TrabeTypeTabs tradeType={tradeType} setTradeType={setTradeType} />
              </Box>
              <Box sx={{ width: "50%", textAlign: "right" }}>
                <span>총 {tradeList.length}건</span>
              </Box>
            </Box>
            {isLoading ? <Loader /> : <TradeList tradeList={tradeList} tradeType={tradeType} />}
          </>
        )}
      </Container>
    </CommonLayout>
  );
};

export const getServerSideProps = async ({ query }) => {
  return {
    props: {
      query,
    },
  };
};

export default UserTradePage;
