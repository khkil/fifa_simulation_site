import ChargeCalutationGraph from "@/components/home/ChargeCalutationGraph";
import CommonLayout from "@/components/layouts/CommonLayout";
import NicknameSearchBox from "@/components/user/NicknameSearchBox";
import { Box, Container } from "@mui/material";
import { useRouter } from "next/router";

export default function Home() {
  const { push } = useRouter();
  const onSubmit = (nickname) => {
    push({
      pathname: "/user/squad",
      query: { nickname },
    });
  };
  return (
    <CommonLayout>
      <Container maxWidth="xl">
        <NicknameSearchBox nickname={""} label="스쿼드를 검색할 유저의 이름을 입력해주세요." onSubmit={onSubmit} />
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Box>{/* to-do 시세 그래프?  */}</Box>
          <Box sx={{ width: "40%" }}>
            <ChargeCalutationGraph />
          </Box>
        </Box>
      </Container>
    </CommonLayout>
  );
}
