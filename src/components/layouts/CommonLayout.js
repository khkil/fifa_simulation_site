import Header from "@/components/layouts/Header";
import { Box, Grid } from "@mui/material";
import KakaoBanner from "../banner/KakaoBanner";

const CommonLayout = ({ children }) => {
  return (
    <>
      <Header />
      <Box sx={{ pt: 3 }}>
        <Grid container>
          <Grid item xs={2.5}></Grid>
          <Grid item xs={7}>
            <Box sx={{ ml: 31 }}>
              <KakaoBanner width={720} height={90} unit={"DAN-RDzqKJqyvW8vJI9e"} />
            </Box>
            <main>{children}</main>
            <Box sx={{ mt: 5, ml: 31 }}>
              <KakaoBanner width={720} height={90} unit={"DAN-RDzqKJqyvW8vJI9e"} />
            </Box>
          </Grid>
          <Grid item xs={2.5}></Grid>
        </Grid>
      </Box>
    </>
  );
};

export default CommonLayout;
