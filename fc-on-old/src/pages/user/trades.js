import Loader from "@/components/common/Loader";
import NotFound from "@/components/common/NotFound";
import CommonLayout from "@/components/layouts/CommonLayout";
import NicknameSearchBox from "@/components/user/NicknameSearchBox";
import TrabeTypeSubHeader from "@/components/user/trades/TrabeTypeSubHeader";
import TradeList from "@/components/user/trades/TradeList";
import { TRADE_TYPES } from "@/constants";
import { fetchUserTrades } from "@/services/userService";
import { Container, Typography } from "@mui/material";
import { useMemo, useState } from "react";
import { useQuery } from "react-query";

export const sortedList = [
  { name: "거래일자", value: "date" },
  { name: "금액", value: "price" },
];

const UserTradePage = ({ query }) => {
  const [tradeType, setTradeType] = useState(TRADE_TYPES[0].type);
  const [sort, setSort] = useState(sortedList[0].value);

  const enabled = useMemo(() => !!query.nickname, [query]);

  const { data, isLoading, isSuccess } = useQuery(
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

  const tradeList = useMemo(() => {
    return (data || []).sort((a, b) => {
      if (sort === "price") {
        return b.value - a.value;
      } else if (sort === "date") {
        return a.tradeDate < b.tradeDate ? 1 : -1;
      }
    });
  }, [data, sort]);

  return (
    <CommonLayout>
      <Container maxWidth="lg">
        <NicknameSearchBox nickname={query.nickname} />
        <Typography sx={{ pl: 2, color: "#aaaaaa", fontSize: 15 }}>* 최근 구매/판매 내역 각 100건 씩 총 200건의 거래내역을 불러옵니다.</Typography>
        {enabled && (
          <>
            {isLoading ? (
              <Loader />
            ) : isSuccess ? (
              <>
                <TrabeTypeSubHeader tradeList={tradeList} tradeType={tradeType} setTradeType={setTradeType} sort={sort} setSort={setSort} />
                <TradeList tradeList={tradeList} tradeType={tradeType} />
              </>
            ) : (
              <NotFound />
            )}
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
