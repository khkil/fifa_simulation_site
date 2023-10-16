import CommonLayout from "@/components/layouts/CommonLayout";
import NicknameSearchBox from "@/components/user/NicknameSearchBox";
import TrabeTypeTabs from "@/components/user/trades/TrabeTypeTabs";
import TradeList from "@/components/user/trades/TradeList";
import { TRADE_TYPES, TRADE_TYPE_ALL } from "@/constants";
import { fetchUserTrades } from "@/services/userService";
import { Container } from "@mui/material";
import { useMemo, useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { useInfiniteQuery } from "react-query";

const PER_PAGE = 10;
const MAX_LIMIT = 100;

const UserTradePage = ({ query }) => {
  const [tradeType, setTradeType] = useState(TRADE_TYPES[0].type);
  const useScrollPaging = useMemo(() => tradeType !== TRADE_TYPE_ALL, [tradeType]);

  const { data, fetchNextPage, isFetchingNextPage, hasNextPage, isFetching, isLoading, isError } = useInfiniteQuery(
    ["userTrades", query.nickname, tradeType],
    ({ pageParam = 0 }) =>
      !!query.nickname &&
      fetchUserTrades({
        offset: useScrollPaging ? pageParam : 0,
        limit: useScrollPaging ? pageParam + PER_PAGE : 100,
        nickname: query.nickname,
        tradeType,
      }),
    {
      getNextPageParam: (_, allPages) => {
        const nextLimit = allPages.length * PER_PAGE;
        return useScrollPaging && nextLimit < MAX_LIMIT ? nextLimit : undefined;
      },
    }
  );

  const pages = useMemo(() => data?.pages.filter((page) => !!page) || [], [data]);

  return (
    <CommonLayout>
      <Container maxWidth="lg">
        <NicknameSearchBox nickname={query.nickname} />
        <TrabeTypeTabs tradeType={tradeType} setTradeType={setTradeType} />
        <InfiniteScroll hasMore={hasNextPage} loadMore={() => !isFetchingNextPage && fetchNextPage()}>
          {pages.length > 0 && <TradeList pages={pages} />}
        </InfiniteScroll>
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
