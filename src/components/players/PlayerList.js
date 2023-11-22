import { LEFT_FOOT, RIGHT_FOOT } from "@/constants";
import { convertPriceFormat, getOverallColor, getPlusStatFromGrade, getPositionGroup } from "@/utils";
import { Box, Typography, useTheme } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";
import { useMemo, useState } from "react";
import CustomImage from "../common/CustomImage";
import NotFound from "../common/NotFound";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const PlayerList = ({ pages }) => {
  const theme = useTheme();
  if (pages[0]?.content.length === 0) return <NotFound text={"해당 조건에 맞는 선수를 찾을수 없습니다."} />;
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell width={330} align="center">
              선수
            </StyledTableCell>
            <StyledTableCell width={100} align="center">
              강화
            </StyledTableCell>
            <StyledTableCell width={80} align="center">
              급여
            </StyledTableCell>
            <StyledTableCell align="center">스피드</StyledTableCell>
            <StyledTableCell align="center">슛</StyledTableCell>
            <StyledTableCell align="center">패스</StyledTableCell>
            <StyledTableCell align="center">드리블</StyledTableCell>
            <StyledTableCell align="center">피지컬</StyledTableCell>
            <StyledTableCell align="center">수비</StyledTableCell>
            <StyledTableCell width={200} align="center">
              현재 가격
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {pages.map(({ content }) => content?.map((player, index) => <Player key={index} theme={theme} player={player} index={index} />))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const Player = ({
  player: {
    spId,
    playerName,
    pay,
    preferredFoot,
    leftFoot,
    rightFoot,
    priceList,
    season: { id, imageUrl },
    average,
    positions,
  },
  theme: {
    palette: { player, overall },
  },
  index,
}) => {
  const [grade, setGrade] = useState(1);
  const [showGrade, setShowGrade] = useState(false);

  const { speed, shooting, passing, dribble, physical, defending } = useMemo(() => {
    const plusAverage = { ...average };
    for (const key in plusAverage) {
      plusAverage[key] = plusAverage[key] + getPlusStatFromGrade(grade);
    }
    return plusAverage;
  }, [average, grade]);

  return (
    <StyledTableRow key={spId}>
      <StyledTableCell align="center">
        <Box
          sx={{
            display: "flex",
          }}
        >
          <Box>
            <CustomImage
              width={100}
              height={100}
              src={`https://${process.env.NEXT_PUBLIC_NEXON_CDN_SEVER_URL}/live/externalAssets/common/playersAction/p${spId}.png`}
              spId={spId}
              seasonId={id}
            />
          </Box>
          <Box p={2}>
            <Box
              sx={{
                display: "flex",
              }}
            >
              <img style={{ height: 20, paddingRight: 5 }} src={imageUrl} />
              <Typography fontWeight={"bold"} fontSize={16}>
                {playerName}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              {positions.map(({ positionName, overall }) => (
                <Box sx={{ display: "flex", pt: 0.5, pb: 0.5 }}>
                  <Typography fontWeight={"bold"} color={player[getPositionGroup(positionName)]}>
                    {positionName}
                  </Typography>
                  <Typography className={getPositionGroup(positionName)} sx={{ mr: 1 }}>
                    {overall + getPlusStatFromGrade(grade)}
                  </Typography>
                </Box>
              ))}
            </Box>
            <Box
              sx={{
                display: "flex",
                mt: -0.5,
              }}
            >
              <Typography fontSize={15} fontWeight={preferredFoot === LEFT_FOOT ? "bold" : ""}>
                L{leftFoot}
              </Typography>
              <Typography fontSize={15} sx={{ ml: 0.5, mr: 0.5 }}>
                -
              </Typography>
              <Typography fontSize={15} fontWeight={preferredFoot === RIGHT_FOOT ? "bold" : ""}>
                R{rightFoot}
              </Typography>
            </Box>
          </Box>
        </Box>
      </StyledTableCell>
      <StyledTableCell align="center" sx={{ pb: 4.5, pl: 4 }}>
        <Box sx={{ position: "absolute", zIndex: 100 - index }}>
          {showGrade ? (
            [...Array(10)].map((_, index) => (
              <img
                onClick={() => {
                  setGrade(index + 1);
                  setShowGrade(false);
                }}
                width={35}
                height={25}
                src={`/images/strong/${index + 1}.png`}
              />
            ))
          ) : (
            <img
              width={35}
              height={25}
              src={`/images/strong/${grade}.png`}
              onClick={() => {
                setShowGrade(!showGrade);
              }}
            />
          )}
        </Box>
      </StyledTableCell>
      <StyledTableCell align="center">
        <p
          style={{
            lineHeight: 2.4,
            backgroundImage: `url(/images/pay/pay-border.png)`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "50%",
          }}
        >
          <Typography sx={{ p: 1, pl: `${pay < 10 ? 12 : 20}`, fontWeight: "bold" }}>{pay}</Typography>
        </p>
      </StyledTableCell>
      <StyledTableCell align="center">
        <Typography color={getOverallColor(overall, speed)}>{speed}</Typography>
      </StyledTableCell>
      <StyledTableCell align="center">
        <Typography color={getOverallColor(overall, shooting)}>{shooting}</Typography>
      </StyledTableCell>
      <StyledTableCell align="center">
        <Typography color={getOverallColor(overall, passing)}>{passing}</Typography>
      </StyledTableCell>
      <StyledTableCell align="center">
        <Typography color={getOverallColor(overall, dribble)}>{dribble}</Typography>
      </StyledTableCell>
      <StyledTableCell align="center">
        <Typography color={getOverallColor(overall, physical)}>{physical}</Typography>
      </StyledTableCell>
      <StyledTableCell align="center">
        <Typography color={getOverallColor(overall, defending)}>{defending}</Typography>
      </StyledTableCell>
      <StyledTableCell align="center">{convertPriceFormat(priceList[grade - 1].price)} BP</StyledTableCell>
    </StyledTableRow>
  );
};

export default PlayerList;
