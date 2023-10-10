import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

const PlayerList = ({ pages }) => {
  console.log(pages);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>선수</StyledTableCell>
            <StyledTableCell align="center">급여</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {pages.map(({ content }) =>
            content?.map(({ spId, name }) => (
              <StyledTableRow key={spId}>
                <StyledTableCell component="th" scope="row">
                  {name}
                  <img
                    src={`https://fco.dn.nexoncdn.co.kr/live/externalAssets/common/playersAction/p${spId}.png?rd=202310090430`}
                    alt=""
                    onerror="this.src='https://fco.dn.nexoncdn.co.kr/live/externalAssets/common/players/not_found.png'"
                  ></img>
                </StyledTableCell>
                <StyledTableCell align="right">2</StyledTableCell>
              </StyledTableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PlayerList;
