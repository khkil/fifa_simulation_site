import { Grid, LinearProgress, Typography } from "@mui/material";

const MatchRecods = ({ matchInfoList: [user1, user2] }) => {
  const getSuccessRate = (part, whole) => {
    if (whole == 0) return 0;
    return parseFloat(((part / whole) * 100).toFixed(1));
  };
  return (
    <Grid container sx={{ p: 1 }}>
      <RecordRow desc={"슛"} value1={user1.shoot.shootTotal} value2={user2.shoot.shootTotal} maxValue={100} />
      <RecordRow desc={"유효슛"} value1={user1.shoot.effectiveShootTotal} value2={user2.shoot.effectiveShootTotal} maxValue={100} />
      <RecordRow
        desc={"슛 성공률(%)"}
        value1={`${getSuccessRate(user1.shoot.goalTotal, user1.shoot.shootTotal)}%`}
        value2={`${getSuccessRate(user2.shoot.goalTotal, user2.shoot.shootTotal)}%`}
      />
      <RecordRow
        desc={"패스 성공률(%)"}
        value1={`${getSuccessRate(user1.pass.passSuccess, user1.pass.passTry)}%`}
        value2={`${getSuccessRate(user2.pass.passSuccess, user2.pass.passTry)}%`}
      />
      <RecordRow desc={"점유율(%)"} value1={`${user1.matchDetail.possession}%`} value2={`${user2.matchDetail.possession}%`} maxValue={100} />
      <RecordRow desc={"코너킥"} value1={user1.defence.tackleSuccess} value2={user2.defence.tackleSuccess} maxValue={100} />
      <RecordRow desc={"태클"} value1={user1.shoot.shootTotal} value2={user2.shoot.shootTotal} maxValue={100} />
      <RecordRow desc={"파울"} value1={user1.matchDetail.foul} value2={user2.matchDetail.foul} maxValue={100} />
      <RecordRow desc={"오프사이드"} value1={user1.matchDetail.offsideCount} value2={user2.matchDetail.offsideCount} maxValue={100} />
      <RecordRow desc={"경고"} value1={user1.matchDetail.yellowCards} value2={user2.matchDetail.yellowCards} maxValue={100} />
      <RecordRow desc={"퇴장"} value1={user1.matchDetail.redCards} value2={user2.matchDetail.redCards} maxValue={100} />
      <RecordRow desc={"부상"} value1={user1.matchDetail.injury} value2={user2.matchDetail.injury} maxValue={100} />
    </Grid>
  );
};

const RecordRow = ({ value1, value2, desc, maxValue }) => {
  return (
    <>
      <Grid item xs={3} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <LinearProgress />
      </Grid>
      <Grid item xs={2} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Typography fontSize={17}>{value1}</Typography>
      </Grid>
      <Grid item xs={2} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Typography fontSize={17} fontWeight={"bold"}>
          {desc}
        </Typography>
      </Grid>
      <Grid item xs={2} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Typography fontSize={17}>{value2}</Typography>
      </Grid>
      <Grid item xs={3} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        1
      </Grid>
    </>
  );
};

export default MatchRecods;
