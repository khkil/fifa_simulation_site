import CustomImage from "@/components/common/CustomImage";
import { POSITION_GROUP } from "@/constants";
import { getPositionGroup } from "@/utils";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Box, Collapse, Divider, List, ListItemButton, ListItemText, ListSubheader, Typography, useTheme } from "@mui/material";
import { useState } from "react";

const SquadPlayerList = ({ players, seasons }) => {
  const { palette } = useTheme();
  return (
    <Box sx={{ width: "100%" }}>
      <List
        sx={{ width: "100%", maxWidth: "100%", bgcolor: "background.paper" }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader" sx={{ border: 1, borderColor: "grey.300" }}>
            <Box display={"flex"} alignItems={"center"}>
              <span>유저 스쿼드</span>

              <Typography sx={{ float: "right", marginLeft: "auto" }}>급여</Typography>
              <Typography sx={{ float: "right", marginLeft: "auto" }}>선수 가치</Typography>
            </Box>
          </ListSubheader>
        }
      >
        {Object.keys(POSITION_GROUP).map((key) => (
          <PlayerGroup
            key={key}
            group={key}
            name={POSITION_GROUP[key].name}
            positions={POSITION_GROUP[key].positions}
            players={players}
            seasons={seasons}
            palette={palette}
          />
        ))}
      </List>
    </Box>
  );
};

const PlayerGroup = ({ group, positions, name, players, seasons, palette }) => {
  const [open, setOpen] = useState(true);
  const players1 = players.filter(({ role }) => positions.includes(role.toLocaleUpperCase()));

  return (
    <>
      <ListItemButton
        sx={{ border: 1, borderColor: "grey.300", background: "#f2f2f2" }}
        onClick={() => {
          setOpen(!open);
        }}
      >
        <ListItemText primary={name} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        {players1.map((player) => (
          <Player player={player} seasons={seasons} palette={palette} />
        ))}
      </Collapse>
    </>
  );
};

const Player = ({ player: { spid, name, ovr, pay, buildUp, role, price, x, y }, seasons, palette }) => {
  const isCandidate = x === 0 && y === 0;

  const positionGroup = getPositionGroup(role.toLocaleUpperCase());

  const seasonId = Number(spid.toString().slice(0, 3));
  const { imageUrl } = seasons.find(({ id }) => id === seasonId);

  return (
    !isCandidate && (
      <List key={spid} component="div" disablePadding sx={{ borderLeft: 1, borderRight: 1, borderColor: "grey.300" }}>
        <Box sx={{ pl: 1.5, pr: 1.5, display: "flex" }}>
          <Box sx={{ display: "flex", alignItems: "center", minWidth: "48.5%" }}>
            <Box>
              <CustomImage
                width={50}
                height={50}
                src={`https://${process.env.NEXT_PUBLIC_NEXON_CDN_SEVER_URL}/live/externalAssets/common/playersAction/p${spid}.png`}
                spId={spid}
                seasonId={seasonId}
              />
            </Box>
            <Box p={2}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <img style={{ height: 15, marginRight: 3 }} src={imageUrl} />
                <Typography fontSize={15} fontWeight={"bold"}>
                  {name}
                </Typography>
                <img style={{ height: 15, marginLeft: 3 }} src={`/images/strong/${buildUp}.png`} />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Typography sx={{ mr: 0.5, color: palette.player[positionGroup], fontWeight: "bold" }}>{role.toLocaleUpperCase()}</Typography>
                <Typography>{ovr}</Typography>
              </Box>
            </Box>
          </Box>
          <Box sx={{ minWidth: 100, pt: 2 }}>
            <p
              style={{
                lineHeight: 2.4,
                backgroundSize: 35,
                backgroundImage: `url(/images/pay/pay-border.png)`,
                backgroundRepeat: "no-repeat",
              }}
            >
              <Typography sx={{ p: 1, pl: `${pay < 10 ? 12 : 8}%`, fontWeight: "bold" }}>{pay}</Typography>
            </p>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", ml: "auto" }}>
            <Typography sx={{ marginLeft: "auto", fontSize: 15, color: "grey" }}>{price} BP</Typography>
          </Box>
        </Box>
        <Divider />
      </List>
    )
  );
};

export default SquadPlayerList;
