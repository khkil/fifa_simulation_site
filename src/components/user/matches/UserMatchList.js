import { convertDateFormat } from "@/utils";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { Box, Collapse, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material";
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
  const isWin = useMemo(() => users.find((user) => user.nickname === nickname).matchResult === "승", [users, nickname]);
  return (
    <>
      <TableRow sx={{ "& > *": { borderBottom: "unset" }, background: isWin ? "#d3edfa" : "#ffdfdf" }}>
        <TableCell width={10}>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        <TableCell scope="row">
          <Box sx={{ display: "flex", justifyContent: "center" }}>{users.map(({ accessId, ...props }) => props.nickname).join(" VS ")}</Box>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Typography sx={{ pl: 2, color: "#888888", fontSize: 12 }}>{convertDateFormat(matchDate)}</Typography>
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
