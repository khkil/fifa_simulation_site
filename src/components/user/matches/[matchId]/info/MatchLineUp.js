import { getPositionGroup } from "@/utils";
import { Search } from "@mui/icons-material";
import { Box, Grid, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, useTheme } from "@mui/material";
import { useMemo, useState } from "react";

const MatchLineup = ({ matchInfoList: [user1, user2] }) => {
  const theme = useTheme();
  const [selectedPlayers, setSelectedPlayers] = useState([null, null]);

  return (
    <Grid container>
      <Grid xs={3} sx={{ display: "flex", justifyContent: "center" }}>
        <PlayerList
          players={user1.player}
          theme={theme}
          selectedPlayer={selectedPlayers[0]}
          setSelectedPlayer={(value) => {
            setSelectedPlayers([value, selectedPlayers[1]]);
          }}
        />
      </Grid>
      <Grid xs={3} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <PlayerDetail spId={selectedPlayers[0]} players={user1.player} />
      </Grid>
      <Grid xs={3} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <PlayerDetail spId={selectedPlayers[1]} players={user2.player} />
      </Grid>
      <Grid xs={3} sx={{ display: "flex", justifyContent: "center" }}>
        <PlayerList
          players={user2.player}
          theme={theme}
          selectedPlayer={selectedPlayers[1]}
          setSelectedPlayer={(value) => {
            setSelectedPlayers([selectedPlayers[0], value]);
          }}
        />
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
  const { spRating, goal, dribble, dribbleSuccess, defending, passSuccess, aerialSuccess, tackle } = useMemo(
    () => players.find((p) => p.spId === spId),
    [spId, players]
  );
  return <Box>{JSON.stringify(selectedPlayer)}</Box>;
};

export default MatchLineup;
