import { Grid, Typography } from "@mui/material";

const MatchInfo = ({ matchInfoList: [user1, user2] }) => {
  return (
    <Grid container>
      <InfoRow desc={"슛"} value1={user1.shoot.shootTotal} value2={user2.shoot.shootTotal} />
      <InfoRow desc={"유효슛"} value1={user1.shoot.effectiveShootTotal} value2={user2.shoot.effectiveShootTotal} />
      <InfoRow
        desc={"슛 성공률(%)"}
        value1={`${((user1.shoot.goalTotal / user1.shoot.shootTotal) * 100).toFixed(1)}%`}
        value2={`${((user2.shoot.goalTotal / user2.shoot.shootTotal) * 100).toFixed(1)}%`}
      />
      <InfoRow
        desc={"패스 성공률(%)"}
        value1={`${((user1.pass.passSuccess / user1.pass.passTry) * 100).toFixed(1)}%`}
        value2={`${((user2.pass.passSuccess / user2.pass.passTry) * 100).toFixed(1)}%`}
      />
      <InfoRow desc={"점유율(%)"} value1={`${user1.matchDetail.possession}%`} value2={`${user2.matchDetail.possession}%`} />
      <InfoRow desc={"코너킥"} value1={user1.defence.tackleSuccess} value2={user2.defence.tackleSuccess} />
      <InfoRow desc={"태클"} value1={user1.shoot.shootTotal} value2={user2.shoot.shootTotal} />
      <InfoRow desc={"파울"} value1={user1.matchDetail.foul} value2={user2.matchDetail.foul} />
      <InfoRow desc={"오프사이드"} value1={user1.matchDetail.offsideCount} value2={user2.matchDetail.offsideCount} />
      <InfoRow desc={"경고"} value1={user1.matchDetail.yellowCards} value2={user2.matchDetail.yellowCards} />
      <InfoRow desc={"퇴장"} value1={user1.matchDetail.redCards} value2={user2.matchDetail.redCards} />
      <InfoRow desc={"부상"} value1={user1.matchDetail.injury} value2={user2.matchDetail.injury} />
    </Grid>
  );
};

const InfoRow = ({ value1, value2, desc }) => {
  return (
    <>
      <Grid item xs={3} sx={{ display: "flex", justifyContent: "center" }}>
        <Typography fontSize={17}>{value1}</Typography>
      </Grid>
      <Grid item xs={6} sx={{ display: "flex", justifyContent: "center" }}>
        <Typography fontSize={17} fontWeight={"bold"}>
          {desc}
        </Typography>
      </Grid>
      <Grid item xs={3} sx={{ display: "flex", justifyContent: "center" }}>
        <Typography fontSize={17}>{value2}</Typography>
      </Grid>
    </>
  );
};

export default MatchInfo;
