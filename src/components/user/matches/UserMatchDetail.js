import Loader from "@/components/common/Loader";
import { fetchUserMatcheDetail } from "@/services/userService";
import { Box, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography, styled, tableCellClasses } from "@mui/material";
import { useQuery } from "react-query";
import MatchInfo from "./UserMatchInfo";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const UserMatchDetail = ({ open, matchId }) => {
  const {
    data: matchDetail,
    isLoading,
    isSuccess,
  } = useQuery(
    [`matchDetail_${matchId}`],
    () =>
      fetchUserMatcheDetail({
        matchId,
      }),
    {
      enabled: !!open,
    }
  );

  return <Box sx={{ margin: 1, minHeight: 300 }}>{isLoading ? <Loader height={"100%"} /> : <MatchDetail matchDetail={matchDetail} />}</Box>;
};

const MatchDetail = ({
  matchDetail: {
    matchInfo: [user1, user2],
  },
}) => {
  return (
    <Box>
      <Typography variant="h6" gutterBottom component="div">
        경기 상세정보
      </Typography>
      <Grid container>
        <Grid xs={3.5}>
          <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
            <PlayerList player={user1.player} />
          </Box>
        </Grid>
        <Grid xs={5}>
          <Box>
            <MatchInfo matchInfoList={[user1, user2]} />
          </Box>
        </Grid>
        <Grid xs={3.5}>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <PlayerList player={user2.player} />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

const PlayerList = ({ player }) => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="customized table">
        <TableBody>
          {player.map(() => (
            <TableRow>
              <StyledTableCell>asd</StyledTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserMatchDetail;
