import { getPositionGroup } from "@/utils";
import { Avatar, Badge, Chip, Typography } from "@mui/material";

const SquestField = ({ squad: { players }, seasons }) => {
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
        <Player key={index} player={player} seasons={seasons} />
      ))}
    </div>
  );
};

const Player = ({ player: { spid, name, role, buildUp, thumb, x, y }, seasons }) => {
  if ((x === 0) & (y === 0)) return null;
  const positionGroup = getPositionGroup(role.toLocaleUpperCase());

  const seasonId = Number(spid.toString().slice(0, 3));
  const { imageUrl } = seasons.find(({ id }) => id === seasonId);

  return (
    <div
      style={{
        position: "absolute",
        justifyContent: "center",
        left: `${role === "gk" ? 46.3 : x * 0.95}%`,
        top: `${(role === "gk" ? 100 : 100 - y) * 0.85}%`,
      }}
    >
      <Avatar alt="Remy Sharp" src={`https://${process.env.NEXT_PUBLIC_NEXON_CDN_SEVER_URL}/live/externalAssets/common${thumb}`} />
      <Badge sx={{ ml: "-40%" }} badgeContent={role.toLocaleUpperCase()} color={positionGroup}>
        <Chip
          size="small"
          sx={{ display: "flex", alignItems: "center", ml: 3, background: "#f1f1f1", color: "black" }}
          label={
            <Typography sx={{ fontSize: 15, fontWeight: "bold", display: "flex", alignItems: "center" }}>
              <img style={{ height: 15, marginRight: 5 }} src={imageUrl} />
              {name}
              <img style={{ height: 15, marginLeft: 5 }} src={`/images/strong/${buildUp}.png`} />
            </Typography>
          }
        />
      </Badge>
    </div>
  );
  //return <div style={{ position: "absolute", left: `${x * 0.9}%`, top: `${100 - y}%` }}>{name}</div>;
};

export default SquestField;
