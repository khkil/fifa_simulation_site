import Loader from "@/components/common/Loader";
import NotFound from "@/components/common/NotFound";
import CommonLayout from "@/components/layouts/CommonLayout";
import NicknameSearchBox from "@/components/user/NicknameSearchBox";
import MatchTypeTabs from "@/components/user/matches/MatchTypeTabs";
import UserMatchList from "@/components/user/matches/UserMatchList";
import { fetchUserMatches } from "@/services/userService";
import { Container, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { useInfiniteQuery } from "react-query";

export const getServerSideProps = async ({ query: { nickname = "" } }) => {
  const response = await fetch(`https://${process.env.NEXT_PUBLIC_STATIC_API_URL}/fconline/latest/matchtype.json`);
  const matchTypes = await response.json();

  return {
    props: {
      nickname,
      matchTypes,
    },
  };
};

const UserMatchPage = ({ nickname, matchTypes }) => {
  const router = useRouter();
  console.log(router);
  const [selectedMatchType, setSelectedMatchType] = useState(50);

  const { data, fetchNextPage, isFetchingNextPage, hasNextPage, isFetching, isLoading, isError } = useInfiniteQuery(
    ["matches", selectedMatchType, nickname],
    ({ pageParam = 1 }) => nickname && fetchUserMatches({ nickname, matchType: selectedMatchType, page: pageParam }),
    {
      getNextPageParam: (data, allPages) => (data?.length > 0 ? allPages.length + 1 : undefined),
    }
  );

  const pages = useMemo(() => data?.pages || [], [data]);

  return (
    <CommonLayout>
      <Container maxWidth="lg">
        <MatchTypeTabs matchTypes={matchTypes} selectedMatchType={selectedMatchType} setSelectedMatchType={setSelectedMatchType} />
        <NicknameSearchBox nickname={nickname} />
        <Typography sx={{ pl: 2, color: "#aaaaaa", fontSize: 15 }}>* 선택한 매치타입의 결과를 가져옵니다.</Typography>
        {nickname && (
          <InfiniteScroll hasMore={hasNextPage} loadMore={() => !isFetchingNextPage && fetchNextPage()}>
            {isLoading ? <Loader /> : pages.length > 0 && pages[0].length > 0 ? <UserMatchList pages={pages} nickname={nickname} /> : <NotFound />}
            {isFetchingNextPage && <Loader height={200} />}
          </InfiniteScroll>
        )}
      </Container>
    </CommonLayout>
  );
};

export default UserMatchPage;
