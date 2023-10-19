import CommonLayout from "@/components/layouts/CommonLayout";
import NicknameSearchBox from "@/components/user/NicknameSearchBox";
import SquadPlayerList from "@/components/user/squad/SquadPlayerList";
import { fetchUserSquad } from "@/services/userService";
import { Container } from "@mui/material";
import { useQueries } from "react-query";

const UserSquadPage = ({ query }) => {
  const nickname = query?.nickname;

  const [{ data: squad }] = useQueries([
    {
      queryKey: ["squad", nickname],
      queryFn: () => fetchUserSquad({ nickname }),
      enabled: !!nickname,
    },
  ]);

  console.log(squad);
  return (
    <CommonLayout>
      <Container maxWidth="lg">
        <NicknameSearchBox nickname={query.nickname} />
        {squad && <SquadPlayerList squad={squad} />}
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

export default UserSquadPage;
