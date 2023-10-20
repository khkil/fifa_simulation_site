import CustomImage from "@/components/common/CustomImage";
import { POSITION_GROUP } from "@/constants";
import { convertPriceFormat } from "@/utils";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Box, Collapse, Divider, List, ListItemButton, ListItemText, ListSubheader, Typography, useTheme } from "@mui/material";
import { useMemo, useState } from "react";

const SquadPlayerList = ({ squad }) => {
  const { palette } = useTheme();
  const { totalPrice, totalPay } = useMemo(
    () => ({
      totalPrice: squad.reduce((sum, { recentPrice }) => sum + recentPrice, 0),
      totalPay: squad.filter(({ positionName }) => positionName !== "SUB").reduce((sum, { pay }) => sum + pay, 0),
    }),
    squad
  );
  return (
    <Box sx={{ p: 3, width: "100%" }}>
      <List
        sx={{ width: "100%", maxWidth: "100%", bgcolor: "background.paper" }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader" sx={{ border: 1, borderColor: "grey.300" }}>
            <Box display={"flex"} alignItems={"center"}>
              <span>유저 스쿼드</span>

              <Typography sx={{ float: "right", marginLeft: "auto", fontWeight: "bold" }}>급여 {totalPay}/250</Typography>
              <Typography sx={{ float: "right", marginLeft: "auto", fontWeight: "bold" }}>구단가치 {convertPriceFormat(totalPrice)} BP</Typography>
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
            squad={squad}
            palette={palette}
          />
        ))}
      </List>
    </Box>
  );
};

const PlayerGroup = ({ group, positions, name, squad, palette }) => {
  const [open, setOpen] = useState(true);
  const players = squad.filter(({ positionName }) => positions.includes(positionName));

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
        {players.map(({ playerId, playerName, grade, positionName, seasonId, seasonImgUrl, recentPrice, pay }) => (
          <List key={playerId} component="div" disablePadding sx={{ borderLeft: 1, borderRight: 1, borderColor: "grey.300" }}>
            <Box sx={{ p: 1.5, display: "flex", alignItems: "center" }}>
              <Typography sx={{ mr: 2, color: palette.player[group], width: 30, fontWeight: "bold" }}>{positionName}</Typography>
              <CustomImage
                width={60}
                height={60}
                src={`https://${process.env.NEXT_PUBLIC_NEXON_CDN_SEVER_URL}/live/externalAssets/common/playersAction/p${playerId}.png`}
                spId={playerId}
                seasonId={seasonId}
              />
              <img style={{ height: 20, marginLeft: 20, marginRight: 5 }} src={seasonImgUrl} />
              {playerName}
              <strong>+{grade}</strong>
              <Typography sx={{ marginLeft: "auto", fontSize: 15, color: "grey" }}>{convertPriceFormat(recentPrice)} BP</Typography>
            </Box>
            <Divider />
          </List>
        ))}
      </Collapse>
    </>
  );
};

export default SquadPlayerList;
