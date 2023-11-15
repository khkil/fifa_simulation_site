import Header from "@/components/layouts/Header";
import { Box, Grid } from "@mui/material";
import KakaoBanner from "../banner/KakaoBanner";

const CommonLayout = ({ children }) => {
  return (
    <>
      <Header />
      <Box sx={{ pt: 3 }}>
        <Grid container>
          <Grid item xs={2.5}>
            <KakaoBanner width={720} height={90} unit={"DAN-fjZJhYt1gy2sneOS"} selector={"kakao_banner1"} />
          </Grid>
          <Grid item xs={7}>
            <Box sx={{ ml: 31 }}>
              <KakaoBanner width={720} height={90} unit={"DAN-1brnXIhcR91It7ql"} selector={"kakao_banner2"} />
              <KakaoBanner width={720} height={90} unit={"DAN-cIyfK4j3X2aJocSa"} selector={"kakao_banner3"} />
            </Box>
            <main>{children}</main>
          </Grid>
          <Grid item xs={2.5}>
            asd
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default CommonLayout;
