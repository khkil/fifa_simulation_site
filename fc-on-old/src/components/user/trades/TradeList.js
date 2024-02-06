import { TRADE_TYPES, TRADE_TYPE_ALL, TRADE_TYPE_BUY } from "@/constants";
import { convertDateFormat, convertPriceFormat } from "@/utils";
import {
  Box,
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  styled,
  tableCellClasses,
} from "@mui/material";
import { useMemo } from "react";

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

const Trade = ({ trade: { saleSn, tradeType, playerName, grade, value, recentPrice, tradeDate, season } }) => {
  const { desc } = TRADE_TYPES.find(({ type }) => type === tradeType);
  const profit = useMemo(() => (tradeType === TRADE_TYPE_BUY ? recentPrice - value : value - recentPrice), [value, recentPrice]);

  return (
    <StyledTableRow key={saleSn}>
      {playerName ? (
        <>
          <StyledTableCell align="center">
            <Chip label={desc} color={tradeType === TRADE_TYPE_BUY ? "error" : "info"} />
          </StyledTableCell>
          <StyledTableCell align="left">
            {playerName && (
              <>
                <Box sx={{ display: "flex" }}>
                  <img style={{ height: 20, paddingRight: 5 }} src={season.imageUrl} />
                  {playerName}
                  <strong>+{grade}</strong>
                </Box>
                <Box>
                  <strong>{convertPriceFormat(value)}</strong> BP
                </Box>
              </>
            )}
          </StyledTableCell>
          <StyledTableCell align="center">
            <Box>
              <strong>{convertPriceFormat(recentPrice)}</strong> BP
            </Box>
            <Box>
              <Typography sx={{ color: profit !== 0 && (profit > 0 ? "blue" : "red") }}>
                {profit > 0 ? "+" : ""}
                {convertPriceFormat(profit)} BP
              </Typography>
            </Box>
          </StyledTableCell>
          <StyledTableCell align="center">{convertDateFormat(tradeDate)}</StyledTableCell>
        </>
      ) : (
        <StyledTableCell align="center" colSpan={4}>
          선수정보를 찾을수 없습니다.
        </StyledTableCell>
      )}
    </StyledTableRow>
  );
};

const TradeList = ({ tradeList, tradeType }) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center" width={150}>
              거래 유형
            </StyledTableCell>
            <StyledTableCell align="left" width={300}>
              선수
            </StyledTableCell>
            <StyledTableCell align="center">현재시세</StyledTableCell>
            <StyledTableCell align="center">거래 일자</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tradeList
            .filter((trade) => tradeType === TRADE_TYPE_ALL || trade.tradeType === tradeType)
            .map((trade, index) => (
              <Trade key={index} /* theme={theme} */ trade={trade} />
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TradeList;