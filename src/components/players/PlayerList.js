import { getPositionGroup } from "@/utils";
import { Box, Typography, useTheme } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";
import CustomImage from "../common/CustomImage";

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

const Player = ({
  player: {
    spId,
    playerName,
    season: { imageUrl },
    positions,
  },
  theme: {
    palette: { player },
  },
}) => {
  return (
    <StyledTableRow key={spId}>
      <StyledTableCell align="left">
        <Box
          sx={{
            display: "flex",
          }}
        >
          <Box>
            <CustomImage
              width={100}
              height={100}
              src={`https://${process.env.NEXT_PUBLIC_NEXON_CDN_SEVER_URL}/live/externalAssets/common/playersAction/p${spId}.png?rd=202310090430`}
            />
          </Box>
          <Box p={2}>
            <Box
              sx={{
                display: "flex",
              }}
            >
              <img style={{ height: 20, paddingRight: 5 }} src={imageUrl} />
              {playerName}
            </Box>
            <Box>
              {positions.map(({ positionName, stat }) => (
                <>
                  <Typography variant="caption" color={player[getPositionGroup(positionName)]}>
                    {positionName}
                  </Typography>
                  <Typography variant="overline" className={getPositionGroup(positionName)} sx={{ mr: 0.5 }}>
                    {stat}
                  </Typography>
                </>
              ))}
            </Box>
          </Box>
        </Box>
      </StyledTableCell>
      <StyledTableCell align="center">2</StyledTableCell>
    </StyledTableRow>
  );
};

const PlayerList = ({ pages }) => {
  const theme = useTheme();
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">선수</StyledTableCell>
            <StyledTableCell align="center">급여</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>{pages.map(({ content }) => content?.map((player, index) => <Player key={index} player={player} theme={theme} />))}</TableBody>
      </Table>
    </TableContainer>
  );
};

export default PlayerList;
