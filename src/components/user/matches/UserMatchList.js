import { convertDateFormat } from "@/utils";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { Avatar, Box, Chip, Collapse, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material";
import { useMemo, useState } from "react";

const UserMatchList = ({ pages, nickname }) => {
  return (
    <Box sx={{ p: 2 }}>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableBody>{pages.map((data) => data.map((match) => <MatchRow match={match} nickname={nickname} />))}</TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

const MatchRow = ({ match: { matchDate, users }, nickname }) => {
  const [open, setOpen] = useState(false);
  const targetUser = useMemo(() => users.find((user) => user.nickname === nickname), [users, nickname]);
  return (
    <>
      <TableRow
        sx={{
          "& > *": { borderBottom: "unset" },
          background: targetUser.matchResult === "승" ? "#d3edfa" : targetUser.matchResult === "무" ? "#e7e7e7" : "#ffdfdf",
        }}
      >
        <TableCell width={10}>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        <TableCell scope="row">
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Box sx={{ display: "flex", width: "45%", justifyContent: "flex-end" }} label={users[0].nickname}>
              <Chip avatar={<Avatar>{users[0].matchResult}</Avatar>} label={<Typography>{users[0].nickname}</Typography>} />
            </Box>
            <Typography sx={{ display: "flex", justifyContent: "center", width: "10%", fontWeight: "bold", fontSize: 20 }}>
              {users[0].goal} : {users[1].goal}
            </Typography>
            <Box sx={{ display: "flex", width: "45%", justifyContent: "flex-start" }} label={users[0].nickname}>
              <Chip avatar={<Avatar>{users[1].matchResult}</Avatar>} label={<Typography>{users[1].nickname}</Typography>} />
            </Box>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Typography sx={{ pl: 2, color: "#888888", fontSize: 14 }}>{convertDateFormat(matchDate)}</Typography>
          </Box>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                경기 상세정보
              </Typography>
              <Box>aasd</Box>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};
export default UserMatchList;
