import CommonLayout from "@/components/layouts/CommonLayout";
import CustomizedTables from "@/components/players/PlayerList";
import { Container } from "@mui/material";

const playerListPage = () => {
  return (
    <CommonLayout>
      <Container maxWidth="md">
        선수목록
        <CustomizedTables />
      </Container>
    </CommonLayout>
  );
};

export default playerListPage;
