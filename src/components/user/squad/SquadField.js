import { getPositionGroup } from "@/utils";
import { Avatar, Box, Typography, useTheme } from "@mui/material";

const SquestField = ({ squad: { players }, seasons }) => {
  const { palette } = useTheme();

  return (
    <div
      style={{
        height: 800,
        width: 550,
        backgroundSize: "100%, 100%",
        position: "relative",
        backgroundRepeat: "no-repeat",
        backgroundImage: `url(/images/squad/soccer_field.jpg)`,
      }}
    >
      {players.map((player, index) => (
        <Player key={index} player={player} seasons={seasons} palette={palette} />
      ))}
    </div>
  );
};

const Player = ({ player: { spid, name, role, ovr, buildUp, price, thumb, pay, x, y }, seasons, palette }) => {
  if ((x === 0) & (y === 0)) return null;
  const positionGroup = getPositionGroup(role.toLocaleUpperCase());

  const seasonId = Number(spid.toString().slice(0, 3));
  const { imageUrl } = seasons.find(({ id }) => id === seasonId);

  return (
    <div
      style={{
        position: "absolute",
        justifyContent: "center",
        //left: `${role === "gk" ? 46.3 : x * 0.85}%`,
        left: `${x * 0.85}%`,
        top: `${(role === "gk" ? 100 : 100 - y) * 0.85}%`,
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Box>
          <Typography color="white">{ovr}</Typography>
          <Typography fontWeight="bold" fontSize={15} color={palette.player[positionGroup]}>
            {role.toLocaleUpperCase()}
          </Typography>
        </Box>
        <Avatar alt={`${name} 이미지`} src={`https://${process.env.NEXT_PUBLIC_NEXON_CDN_SEVER_URL}/live/externalAssets/common${thumb}`} />
        <Box sx={{ ml: 0.3, pt: 1 }}>
          <img style={{ height: 15 }} src={`/images/strong/${buildUp}.png`} />
          <p
            style={{
              lineHeight: 1,
              backgroundSize: 20,
              backgroundImage: `url(/images/pay/pay-border.png) `,
              backgroundRepeat: "no-repeat",
            }}
          >
            <Typography fontSize={13} sx={{ p: 0.3, pl: `${pay < 10 ? 30 : 8}%`, color: "white" }}>
              {pay}
            </Typography>
          </p>
        </Box>
      </Box>
      <Box sx={{ display: "flex" }}>
        <Typography sx={{ fontSize: 15, color: "white", display: "flex", alignItems: "center" }}>
          <img style={{ height: 15, marginRight: 5 }} src={imageUrl} />
          {name}
        </Typography>
      </Box>
      {/* <Box sx={{ display: "flex" }}>
        <Typography color={"white"} fontWeight={400} fontSize={11}>
          {price} BP
        </Typography>
      </Box> */}
    </div>
  );
};

export default SquestField;
