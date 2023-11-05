import { convertDateFormat, convertPriceFormat } from "@/utils";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { useMemo } from "react";

const UserDetailInfo = ({ squad, info: { nickname, level, topRanks } }) => {
  const { totalPrice, totalPay } = useMemo(
    () => ({
      totalPrice: squad.reduce((sum, { recentPrice }) => sum + (recentPrice || 0), 0),
      totalPay: squad.filter(({ positionName }) => positionName !== "SUB").reduce((sum, { pay }) => sum + pay, 0),
    }),
    squad
  );

  return (
    <Box sx={{ display: "flex" }}>
      <Box sx={{ p: 3, width: "50%", height: "100%" }}>
        <Card sx={{ pl: 2, height: "100%" }}>
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              유저 닉네임
            </Typography>
            <Typography variant="inherit" sx={{ mb: 2 }} component="div">
              {nickname}
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
      <Box sx={{ p: 3, width: "50%", height: "100%" }}>
        <Card sx={{ pl: 2, height: "100%" }}>
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              레벨
            </Typography>
            <Typography variant="inherit" sx={{ mb: 2 }} component="div">
              {level}
            </Typography>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              구단 가치
            </Typography>
            <Typography variant="inherit" sx={{ mb: 2, fontWeight: "bold", fontSize: 20 }} component="div">
              {convertPriceFormat(totalPrice)} BP
            </Typography>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              급여
            </Typography>
            <Typography variant="inherit" sx={{ mb: 2, fontWeight: "bold", fontSize: 20 }} component="div">
              {totalPay} / 250
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default UserDetailInfo;
