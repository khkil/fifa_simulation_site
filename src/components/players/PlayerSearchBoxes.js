import { Autocomplete, Box, Grid, Paper, TextField, Typography, styled } from "@mui/material";

const PlayerSearchBoxes = ({ clubs, skills, params, setParams }) => {
  const style = { border: 1, borderColor: "grey.300" };
  const TitleBox = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    padding: 10,
    height: "100%",
  }));

  return (
    <Paper elevation={16} sx={{ mb: 3 }}>
      <Grid container>
        <Grid item xs={2} sx={{ ...style }}>
          <TitleBox>
            <Typography sx={{ pt: "50%", pl: "36%" }}>클래스</Typography>
          </TitleBox>
        </Grid>
        <Grid item xs={10} sx={{ ...style, p: 1 }}>
          <Box p={1}>
            <Autocomplete
              freeSolo
              options={clubs.map(({ clubName }) => clubName)}
              renderInput={(params) => <TextField {...params} label="클럽" />}
              sx={{ width: "30%" }}
              onChange={(_, clubs) => {
                const clubIds = clubs.map(({ id }) => id);
                setParams({
                  ...params,
                  clubIds,
                });
              }}
            />
          </Box>
          {/* <Box p={1}>
            <Autocomplete
              freeSolo
              options={clubs.map(({ clubName }) => clubName)}
              renderInput={(params) => <TextField {...params} label="국적" />}
              sx={{ width: "30%" }}
            />
          </Box> */}
          <Box p={1} sx={{ display: "flex" }}>
            <Autocomplete
              multiple
              options={clubs}
              getOptionLabel={({ clubName }) => clubName}
              renderInput={(params) => <TextField {...params} label="클럽" />}
              sx={{ width: "45%", mr: 5 }}
              onChange={(_, clubs) => {
                const clubIds = clubs.map(({ id }) => id);
                setParams({
                  ...params,
                  clubIds,
                });
              }}
            />
            <Autocomplete
              multiple
              options={skills}
              getOptionLabel={({ skillName }) => skillName}
              renderInput={(params) => <TextField {...params} label="특성" />}
              onChange={(_, skills) => {
                const skillIds = skills.map(({ id }) => id);
                setParams({
                  ...params,
                  skillIds,
                });
              }}
              sx={{ width: "45%" }}
            />
          </Box>
        </Grid>
        <Grid item xs={2} sx={{ ...style }}>
          <TitleBox>세부 정보</TitleBox>
        </Grid>
        <Grid item xs={10} sx={{ ...style }}>
          9
        </Grid>
      </Grid>
    </Paper>
  );
};

export default PlayerSearchBoxes;
