import Loader from "@/components/common/Loader";
import CommonLayout from "@/components/layouts/CommonLayout";
import NicknameSearchBox from "@/components/user/NicknameSearchBox";
import UserMatchList from "@/components/user/matches/UserMatchList";
import { fetchUserMatches } from "@/services/userService";
import { Container, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import { useMemo, useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { useInfiniteQuery } from "react-query";

const UserMatchPage = ({ query, matchTypes }) => {
  const nickname = query.nickname;
  const sortedMatchType = useMemo(() => {
    const mainMatchTypes = [
      52, //감독모드
      60, // 공식 친선
      30, // 리그 친선
      50, //공식경기
    ];
    return matchTypes.sort((a, b) => mainMatchTypes.indexOf(b.matchtype) - mainMatchTypes.indexOf(a.matchtype));
  }, [matchTypes]);

  const [selectedMatchType, setMatchType] = useState(sortedMatchType[0].matchtype);

  const { data, fetchNextPage, isFetchingNextPage, hasNextPage, isFetching, isLoading, isError } = useInfiniteQuery(
    ["matches", selectedMatchType, query.nickname],
    ({ pageParam = 1 }) => fetchUserMatches({ nickname, matchType: selectedMatchType, page: pageParam }),
    {
      getNextPageParam: (data, allPages) => (data.length > 0 ? allPages.length + 1 : undefined),
    }
  );

  const pages = useMemo(() => data?.pages || [], [data]);

  return (
    <CommonLayout>
      <Container maxWidth="lg">
        <ToggleButtonGroup value={selectedMatchType} sx={{ p: 2, pb: 0 }} color="info">
          {sortedMatchType.map(({ matchtype, desc }) => (
            <ToggleButton
              onClick={(e) => {
                setMatchType(Number(e.target.value));
              }}
              key={matchtype}
              value={matchtype}
            >
              {desc}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
        <NicknameSearchBox nickname={nickname} />
        <Typography sx={{ pl: 2, color: "#aaaaaa", fontSize: 15 }}>* 선택한 매치타입의 결과를 가져옵니다.</Typography>
        <InfiniteScroll hasMore={hasNextPage} loadMore={() => !isFetchingNextPage && fetchNextPage()}>
          {isLoading ? <Loader /> : <UserMatchList pages={pages} nickname={nickname} />}
          {isFetchingNextPage && <Loader height={200} />}
        </InfiniteScroll>
      </Container>
    </CommonLayout>
  );
};

export const getServerSideProps = async ({ query }) => {
  const response = await fetch(`https://${process.env.NEXT_PUBLIC_STATIC_API_URL}/fconline/latest/matchtype.json`);
  const matchTypes = await response.json();

  return {
    props: {
      query,
      matchTypes,
    },
  };
};

export default UserMatchPage;
