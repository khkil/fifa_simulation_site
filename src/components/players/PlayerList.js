import { LEFT_FOOT } from "@/constants";
import { convertPriceFormat, getOverallColor, getPlusStatFromGrade, getPositionGroup } from "@/utils";
import { Box, Slider, Typography, useTheme } from "@mui/material";
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
}) => {
  const [grade, setGrade] = useState(1);
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
              {playerName}
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              {positions.map(({ positionName, overall }) => (
                <>
                  <Typography variant="caption" color={player[getPositionGroup(positionName)]}>
                    {positionName}
                  </Typography>
                  <Typography variant="overline" className={getPositionGroup(positionName)} sx={{ mr: 0.5 }}>
                    {overall + getPlusStatFromGrade(grade)}
                  </Typography>
                </>
              ))}
            </Box>
            <Box
              sx={{
                display: "flex",
                mt: -0.5,
              }}
            >
              {preferredFoot === LEFT_FOOT ? (
                <>
                  <strong>L{leftFoot}</strong>
                  <pre>-</pre>
                  <span>R{rightFoot}</span>
                </>
              ) : (
                <>
                  <span>L{leftFoot}</span>
                  <pre>-</pre>
                  <strong>R{rightFoot}</strong>
                </>
              )}
            </Box>
          </Box>
        </Box>
      </StyledTableCell>
      <StyledTableCell align="center">
        <Typography id="non-linear-slider" gutterBottom>
          강화단계: <strong>+{grade}</strong>
        </Typography>
        <Slider
          aria-label="Temperature"
          defaultValue={1}
          getAriaValueText={(value) => {
            setGrade(value);
          }}
          valueLabelDisplay="auto"
          step={1}
          marks
          min={1}
          max={10}
        />
      </StyledTableCell>
      <StyledTableCell align="center">
        <div>
          <p
            style={{
              lineHeight: 2.4,
              backgroundImage: `url(/images/pay/pay-border.png)`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "50%",
            }}
          >
            {pay}
          </p>
        </div>
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

const PlayerList = ({ pages }) => {
  const theme = useTheme();
  if (pages[0]?.content.length === 0) return <NotFound text={"해당 조건에 맞는 선수를 찾을수 없습니다."} />;
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">선수</StyledTableCell>
            <StyledTableCell width={200} align="center">
              강화수치
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
        <TableBody>{pages.map(({ content }) => content?.map((player, index) => <Player key={index} theme={theme} player={player} />))}</TableBody>
      </Table>
    </TableContainer>
  );
};

export default PlayerList;
