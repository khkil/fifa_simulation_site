import { convertKorPriceFormat, convertPriceFormat, getPercentage, getPositionGroup } from "@/utils";
import { Search } from "@mui/icons-material";
import { Box, Grid, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, useTheme } from "@mui/material";
import { useMemo, useState } from "react";

const MatchLineup = ({ matchInfoList: [user1, user2] }) => {
  const theme = useTheme();
  const [selectedPlayers, setSelectedPlayers] = useState([null, null]);

  const { user1: user1Price, user2: user2Price } = useMemo(
    () => ({
      user1: user1.player.reduce((currentValue, { price }) => price + currentValue, 0),
      user2: user2.player.reduce((currentValue, { price }) => price + currentValue, 0),
    }),
    user1,
    user1
  );

  return (
    <Grid container>
      <Grid xs={3} sx={{ display: "flex", justifyContent: "center" }}>
        <Box>
          <Box sx={{ p: 2 }}>
            <Typography fontWeight={"bold"}>{convertPriceFormat(user1Price)} BP</Typography>
            <Typography sx={{ color: "grey" }}>({convertKorPriceFormat(user1Price)})</Typography>
          </Box>
          <PlayerList
            players={user1.player}
            theme={theme}
            selectedPlayer={selectedPlayers[0]}
            setSelectedPlayer={(value) => {
              setSelectedPlayers([value, selectedPlayers[1]]);
            }}
          />
        </Box>
      </Grid>
      <Grid xs={3} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        {selectedPlayers[0] && <PlayerDetail spId={selectedPlayers[0]} players={user1.player} />}
      </Grid>
      <Grid xs={3} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        {selectedPlayers[1] && <PlayerDetail spId={selectedPlayers[1]} players={user2.player} />}
      </Grid>
      <Grid xs={3} sx={{ display: "flex", justifyContent: "center" }}>
        <Box>
          <Box sx={{ p: 2 }}>
            <Typography fontWeight={"bold"}>{convertPriceFormat(user2Price)} BP</Typography>
            <Typography sx={{ color: "grey" }}>({convertKorPriceFormat(user2Price)})</Typography>
          </Box>
          <PlayerList
            players={user2.player}
            theme={theme}
            selectedPlayer={selectedPlayers[1]}
            setSelectedPlayer={(value) => {
              setSelectedPlayers([selectedPlayers[0], value]);
            }}
          />
        </Box>
      </Grid>
    </Grid>
  );
};

const PlayerList = ({
  players,
  theme: {
    palette: { player, overall },
  },
  setSelectedPlayer,
}) => {
  const mainPlayers = useMemo(
    () => players.filter(({ positionName }) => positionName !== "SUB").sort((a, b) => b.spPosition - a.spPosition),
    [players]
  );

  return (
    <TableContainer>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>선수</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {mainPlayers.map(({ spId, positionName, name, seasonImageUrl }) => (
            <TableRow key={spId}>
              <TableCell>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography sx={{ minWidth: 40 }} fontWeight={"bold"} color={player[getPositionGroup(positionName)]}>
                    {positionName}
                  </Typography>
                  <img style={{ height: 20, marginRight: 3 }} src={seasonImageUrl} />
                  <Typography sx={{ ml: 1 }}>{name}</Typography>
                  <IconButton
                    aria-label="delete"
                    size="small"
                    sx={{ marginLeft: "auto" }}
                    onClick={() => {
                      setSelectedPlayer(spId);
                    }}
                  >
                    <Search fontSize="inherit" />
                  </IconButton>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const PlayerDetail = ({ spId, players }) => {
  const {
    price,
    status: { spRating, goal, shoot, passTry, passSuccess, dribbleTry, dribbleSuccess, aerialTry, aerialSuccess, blockTry, block, tackleTry, tackle },
  } = useMemo(() => players.find((p) => p.spId === spId), [spId, players]);

  return (
    <Box sx={{ textAlign: "center" }}>
      <Chart percent={spRating * 10} title={"평점"} text={spRating} />
      <Chart percent={getPercentage(goal, shoot)} count={goal} title={"슛 성공률(%)"} />
      <Chart percent={getPercentage(passSuccess, passTry)} count={passSuccess} title={"패스 성공률(%)"} />
      <Chart percent={getPercentage(dribbleSuccess, dribbleTry)} count={dribbleSuccess} title={"드리블 성공률(%)"} />
      <Chart percent={getPercentage(aerialSuccess, aerialTry)} count={aerialSuccess} title={"공중볼 성공률(%)"} />
      {/* <Chart percent={getPercentage(block, blockTry)} count={block} title={"블락 성공률(%)"} /> */}
      <Chart percent={getPercentage(tackle, tackleTry)} count={tackle} title={"태클 성공률(%)"} />
    </Box>
  );
};

const Chart = ({ percent, title, count, text }) => {
  return (
    <>
      <Box p={1}>
        <div className="radial-progress" style={{ "--value": percent, "--size": "3.3rem", "--thickness": "4px" }} role="progressbar">
          <Typography fontSize={14}>{text || percent}</Typography>
          <Typography fontWeight={"bold"} fontSize={12} sx={{ color: "grey" }}>
            {count ? `(${count})` : ""}
          </Typography>
        </div>
      </Box>
      <Box>{title}</Box>
    </>
  );
};

export default MatchLineup;
