import { Grid, LinearProgress, Typography } from "@mui/material";
const getPercentage = (part, whole) => {
  if (part == 0 || whole == 0) return 0;
  return parseFloat(((part / whole) * 100).toFixed(1));
};

const MatchRecods = ({ matchInfoList: [user1, user2] }) => {
  return (
    <Grid container sx={{ p: 2 }} spacing={1}>
      <RecordRow desc={"슛"} value1={user1.shoot.shootTotal} value2={user2.shoot.shootTotal} maxValue={20} />
      <RecordRow desc={"유효슛"} value1={user1.shoot.effectiveShootTotal} value2={user2.shoot.effectiveShootTotal} maxValue={20} />
      <RecordRow
        desc={"슛 성공률(%)"}
        value1={`${getPercentage(user1.shoot.goalTotal, user1.shoot.shootTotal)}`}
        value2={`${getPercentage(user2.shoot.goalTotal, user2.shoot.shootTotal)}`}
        maxValue={100}
      />
      <RecordRow
        desc={"패스 성공률(%)"}
        value1={`${getPercentage(user1.pass.passSuccess, user1.pass.passTry)}`}
        value2={`${getPercentage(user2.pass.passSuccess, user2.pass.passTry)}`}
        maxValue={100}
      />
      <RecordRow desc={"점유율(%)"} value1={`${user1.matchDetail.possession}`} value2={`${user2.matchDetail.possession}`} maxValue={20} />
      <RecordRow desc={"코너킥"} value1={user1.defence.tackleSuccess} value2={user2.defence.tackleSuccess} maxValue={20} />
      <RecordRow desc={"태클"} value1={user1.shoot.shootTotal} value2={user2.shoot.shootTotal} maxValue={20} />
      <RecordRow desc={"파울"} value1={user1.matchDetail.foul} value2={user2.matchDetail.foul} maxValue={20} />
      <RecordRow desc={"오프사이드"} value1={user1.matchDetail.offsideCount} value2={user2.matchDetail.offsideCount} maxValue={20} />
      <RecordRow desc={"경고"} value1={user1.matchDetail.yellowCards} value2={user2.matchDetail.yellowCards} maxValue={20} />
      <RecordRow desc={"퇴장"} value1={user1.matchDetail.redCards} value2={user2.matchDetail.redCards} maxValue={20} />
      <RecordRow desc={"부상"} value1={user1.matchDetail.injury} value2={user2.matchDetail.injury} maxValue={20} />
    </Grid>
  );
};

const RecordRow = ({ value1, value2, desc, maxValue }) => {
  const percentage1 = getPercentage(value1, maxValue);
  const percentage2 = getPercentage(value2, maxValue);

  return (
    <>
      <Grid item xs={3}>
        <LinearProgress variant="determinate" color="info" sx={{ height: 10, borderRadius: 5 }} value={200 - percentage1} />
      </Grid>
      <Grid item xs={1.5} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Typography fontSize={17} fontWeight={"bold"}>{`${value1}${desc.indexOf("%") > 1 ? "%" : ""}`}</Typography>
      </Grid>
      <Grid item xs={3} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Typography fontSize={17}>{desc}</Typography>
      </Grid>
      <Grid item xs={1.5} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Typography fontSize={17} fontWeight={"bold"}>{`${value2}${desc.indexOf("%") > 1 ? "%" : ""}`}</Typography>
      </Grid>
      <Grid item xs={3}>
        <LinearProgress variant="determinate" color="success" sx={{ height: 10, borderRadius: 5 }} value={percentage2} />
      </Grid>
    </>
  );
};

export default MatchRecods;
