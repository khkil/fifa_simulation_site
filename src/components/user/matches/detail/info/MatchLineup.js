import CustomImage from "@/components/common/CustomImage";
import NotFound from "@/components/common/NotFound";
import { convertKorPriceFormat, convertPriceFormat, getPercentage, getPositionGroup } from "@/utils";
import { Avatar, Box, Divider, Grid, Typography, useTheme } from "@mui/material";
import { useMemo, useState } from "react";

const MatchLineup = ({ matchInfoList: [user1, user2] }) => {
  const theme = useTheme();
  const [selectedPlayers, setSelectedPlayers] = useState([user1.player[0]?.spId || null, user2.player[0]?.spId || null]);

  const { user1Price, user2Price } = useMemo(
    () => ({
      user1Price: user1.player.reduce((currentValue, { price }) => price + currentValue, 0),
      user2Price: user2.player.reduce((currentValue, { price }) => price + currentValue, 0),
    }),
    user1,
    user1
  );

  return (
    <Grid container sx={{ pb: 3 }}>
      <Grid xs={3.5} sx={{ display: "flex", justifyContent: "flex-start", width: "100%" }}>
        {user1.player.length === 0 ? (
          <NotFound text={"선수 정보 없음"} />
        ) : (
          <Box sx={{ textAlign: "center", width: "100%" }}>
            <Box>
              <Typography fontWeight={"bold"} sx={{ color: "#2e82ef" }}>
                {convertPriceFormat(user1Price)} BP
              </Typography>
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
        )}
      </Grid>
      <Grid xs={2.4} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        {selectedPlayers[0] && <PlayerDetail spId={selectedPlayers[0]} players={user1.player} />}
      </Grid>
      <Grid xs={0.2} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Divider orientation="vertical" flexItem></Divider>
      </Grid>
      <Grid xs={2.4} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        {selectedPlayers[1] && <PlayerDetail spId={selectedPlayers[1]} players={user2.player} />}
      </Grid>
      <Grid xs={3.5} sx={{ display: "flex", justifyContent: "flex-end", width: "100%" }}>
        {user2.player.length === 0 ? (
          <NotFound text={"선수 정보 없음"} />
        ) : (
          <Box sx={{ textAlign: "center", width: "100%" }}>
            <Box>
              <Typography fontWeight={"bold"} sx={{ color: "#2e82ef" }}>
                {convertPriceFormat(user2Price)} BP
              </Typography>
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
        )}
      </Grid>
    </Grid>
  );
};

const PlayerList = ({
  players,
  theme: {
    palette: { player },
  },
  selectedPlayer,
  setSelectedPlayer,
}) => {
  return (
    <ul className="menu bg-base-200  rounded-box" style={{ width: "100%" }}>
      {players.map(({ spId, positionName, name, spGrade, seasonImageUrl }) => (
        <li>
          <a
            className={selectedPlayer === spId ? "active" : ""}
            onClick={() => {
              setSelectedPlayer(spId);
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography sx={{ minWidth: 40 }} fontWeight={"bold"} color={player[getPositionGroup(positionName)]}>
                {positionName}
              </Typography>
              <img style={{ height: 20, marginRight: 3 }} src={seasonImageUrl} />
              <Typography>{name}</Typography>
              <img style={{ height: 15, marginLeft: 3 }} src={`/images/strong/${spGrade}.png`} />
            </Box>
          </a>
        </li>
      ))}
    </ul>
  );
};

const PlayerDetail = ({ spId, players }) => {
  const {
    price,
    name,
    seasonImageUrl,
    spGrade,
    status: { spRating, goal, shoot, passTry, passSuccess, dribbleTry, dribbleSuccess, aerialTry, aerialSuccess, blockTry, block, tackleTry, tackle },
  } = useMemo(() => players.find((p) => p.spId === spId), [spId, players]);

  const seasonId = Number(spId.toString().slice(0, 3));

  return (
    <Box sx={{ textAlign: "center" }}>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Avatar sx={{ width: 80, height: 80 }}>
          <CustomImage
            width={100}
            height={100}
            src={`https://${process.env.NEXT_PUBLIC_NEXON_CDN_SEVER_URL}/live/externalAssets/common/playersAction/p${spId}.png`}
            spId={spId}
            seasonId={seasonId}
          />
        </Avatar>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <img style={{ height: 15, marginRight: 3 }} src={seasonImageUrl} />
        <Typography
          fontWeight={"bold"}
          sx={{
            fontSize: {
              lg: 14,
              md: 9,
              sm: 7,
              xs: 8,
            },
          }}
        >
          {name}
        </Typography>
        <img style={{ height: 15, marginLeft: 3 }} src={`/images/strong/${spGrade}.png`} />
      </Box>
      <Typography fontSize={14} sx={{ color: "#2e82ef" }}>
        {convertPriceFormat(price)}BP
      </Typography>
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
        <Typography fontSize={13} fontWeight={"bold"} pb={0.5}>
          {title}
        </Typography>
        <div
          className="radial-progress"
          style={{ "--value": percent, "--size": "3.3rem", "--thickness": "4px", textAlign: "center" }}
          role="progressbar"
        >
          <Typography fontSize={13}>{text || percent}</Typography>
          <Typography fontWeight={"bold"} fontSize={12} sx={{ color: "grey" }}>
            {count ? `(${count})` : ""}
          </Typography>
        </div>
      </Box>
    </>
  );
};

export default MatchLineup;
