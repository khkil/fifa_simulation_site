import { convertDateFormat } from "@/utils";
import { Box, Card, CardContent, Typography } from "@mui/material";

const UserDetailInfo = ({ info: { nickname, level, topRanks } }) => {
  return (
    <Box sx={{ p: 3, width: "50%" }}>
      <Card sx={{ p: 1, pl: 3, pr: 3 }}>
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
  );
};

export default UserDetailInfo;