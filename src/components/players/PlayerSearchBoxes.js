import { initialParams } from "@/pages/players";
import { RestartAlt, Search } from "@mui/icons-material";
import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import { useState } from "react";

const borderStyle = { border: 1, borderColor: "grey.300" };
const TitleBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

const SeasonSearchBox = ({ seasons, params, setParams }) => {
  const handleChange = (e) => {
    const { checked, value } = e.target;
    const checkedSeasons = checked ? [...params.seasonIds, Number(value)] : params.seasonIds.filter((v) => v !== Number(value));
    setParams({ ...params, seasonIds: checkedSeasons });
  };

  return (
    <>
      <Grid item xs={2} sx={{ ...borderStyle }}>
        <TitleBox>시즌</TitleBox>
      </Grid>
      <Grid item xs={10} sx={{ ...borderStyle, display: "flex", flexFlow: "wrap" }}>
        {seasons.map(({ id, seasonName, imageUrl }) => (
          <FormControlLabel
            sx={{ ml: 1 }}
            control={<Checkbox value={id} onChange={handleChange} sx={{ display: "none" }} />}
            label={
              <img
                style={{ height: 25, margin: 5, marginLeft: -5, opacity: params.seasonIds.includes(id) ? 1 : 0.3 }}
                src={imageUrl}
                alt={seasonName}
              />
            }
          />
        ))}
      </Grid>
    </>
  );
};

const DetailInfoSearchBox = ({ clubs, skills, params, setParams }) => {
  return (
    <>
      <Grid item xs={2} sx={{ ...borderStyle }}>
        <TitleBox>
          <Typography>세부정보</Typography>
        </TitleBox>
      </Grid>
      <Grid item xs={10} sx={{ ...borderStyle, p: 1 }}>
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
    </>
  );
};

const PlayerSearchBoxes = ({ clubs, skills, seasons, params, setParams }) => {
  const [searchText, setSearchText] = useState("");

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      setParams({
        ...params,
        name: searchText,
      });
    }
  };

  const handleChange = (e) => {
    setSearchText(e.target.value);
  };
  return (
    <Paper elevation={16} sx={{ mb: 3 }}>
      {/* 선수명 start */}
      <Grid container>
        <Grid item xs={2} sx={{ ...borderStyle }}>
          <TitleBox>
            <Typography>선수명</Typography>
          </TitleBox>
        </Grid>
        <Grid item xs={8} sx={{ ...borderStyle, borderRight: 0, p: 2 }}>
          <TextField
            label="선수명"
            value={searchText}
            onChange={handleChange}
            onKeyDown={handleKeyPress}
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">
                  <IconButton
                    aria-label="검색"
                    size="medium"
                    onClick={() => {
                      setParams({
                        ...params,
                        name: searchText,
                      });
                    }}
                  >
                    <Search fontSize="inherit" />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          ></TextField>
        </Grid>
        <Grid item xs={2} sx={{ ...borderStyle, borderLeft: 0, p: 2, pl: 0 }}>
          <Button
            fullWidth
            sx={{ height: "100%", ...borderStyle }}
            onClick={() => {
              setParams(initialParams);
            }}
          >
            초기화
            <RestartAlt />
          </Button>
        </Grid>
        {/* 선수명 end */}
        <SeasonSearchBox seasons={seasons} params={params} setParams={setParams} />
        <DetailInfoSearchBox clubs={clubs} skills={skills} params={params} setParams={setParams} />
      </Grid>
    </Paper>
  );
};

export default PlayerSearchBoxes;
