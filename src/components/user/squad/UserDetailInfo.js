import { convertDateFormat } from "@/utils";
import { Box, Card, CardContent, LinearProgress, Typography, useTheme } from "@mui/material";

const positions = ["fw", "mf", "df"];

const UserDetailInfo = ({ squad: { totalPay, ovr, maintotalPrice }, userInfo: { nickname, level, topRanks } }) => {
  const { palette } = useTheme();

  return (
    <Box>
      <Box sx={{ p: 3, width: "100%", height: "100%" }}>
        <Card sx={{ pl: 2, height: "100%" }}>
          <CardContent>
            {positions.map((position) => (
              <>
                <Box sx={{ display: "flex" }}>
                  <Typography sx={{ minWidth: "6%", color: palette[position].main }}>{position.toLocaleUpperCase()}</Typography>
                  <Typography sx={{ fontWeight: "bold" }}>{ovr[position]}</Typography>
                </Box>
                <LinearProgress sx={{ pb: 1, mb: 1 }} color={position} variant="determinate" value={(ovr[position] / 150) * 100} />
              </>
            ))}
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              구단 가치
            </Typography>
            <Typography variant="inherit" sx={{ mb: 2, fontWeight: 400, fontSize: 20, color: "#2e82ef" }} component="div">
              {maintotalPrice} BP
            </Typography>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              급여
            </Typography>
            <Typography variant="inherit" sx={{ mb: 2, fontWeight: 400, fontSize: 20, color: "#2e82ef" }} component="div">
              {totalPay} / 250
            </Typography>
          </CardContent>
        </Card>
      </Box>
      <Box sx={{ p: 3, width: "100%", height: "100%" }}>
        <Card sx={{ pl: 2, height: "100%" }}>
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              유저 닉네임
            </Typography>
            <Typography variant="inherit" sx={{ mb: 2 }} component="div">
              {nickname}
            </Typography>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              레벨
            </Typography>
            <Typography variant="inherit" sx={{ mb: 2 }} component="div">
              {level}
            </Typography>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              최고등급
            </Typography>

            {topRanks.map(({ matchTypeDesc, divisionName, divisionImageUrl, achievementDate }) => (
              <>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography sx={{ fontWeight: "bold" }}>{matchTypeDesc}</Typography>
                  <img width={30} src={divisionImageUrl} />
                  <Typography sx={{ fontSize: 14 }} color="text.secondary">
                    ({divisionName})
                  </Typography>
                </Box>
                <Box>
                  <Typography sx={{ fontSize: 14, mb: 2 }} color="text.secondary">
                    {convertDateFormat(achievementDate)}
                  </Typography>
                </Box>
              </>
            ))}
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default UserDetailInfo;
