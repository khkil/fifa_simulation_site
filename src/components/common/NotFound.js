import { PersonSearch } from "@mui/icons-material";
import { Box, Paper, Typography } from "@mui/material";

const NotFound = ({ text }) => {
  const defaultText = "검색결과를 찾을수 없습니다.";
  return (
    <Box p={2} sx={{ width: "100%" }}>
      <Paper sx={{ background: "#f2f2f2", width: "100%", minHeight: 600, p: 3, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <PersonSearch />
        <Typography fontSize={20} sx={{ whiteSpace: "pre-wrap" }}>
          {text || defaultText}
        </Typography>
      </Paper>
    </Box>
  );
};

export default NotFound;
