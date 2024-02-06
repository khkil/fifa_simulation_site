import { convertKorPriceFormat, convertPriceFormat } from "@/utils";
import { Box, Typography } from "@mui/material";
import CustomImage from "../common/CustomImage";
import Loader from "../common/Loader";

const PlayerPriceRank = ({ title, priceRank, isLoading }) => {
  return (
    <>
      <div role="alert" className="alert">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info shrink-0 w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <Typography fontWeight={"bold"} sx={{ color: "#aaaaaa" }}>
          {title}
        </Typography>
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th className="text-center">선수명</th>
                <th className="text-center">변동 금액(%)</th>
                <th className="text-center">현재 시세</th>
              </tr>
            </thead>
            <tbody>
              {priceRank.map((player, index) => (
                <PlayerRow key={index} player={player} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

const PlayerRow = ({ player: { playerId, playerName, yesterdayPrice, todayPrice, percentage, seasonImgUrl } }) => {
  const seasonId = Number(playerId.toString().slice(0, 3));
  return (
    <tr>
      <td className="text-center">
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="mask mask-squircle w-8 h-8">
              <CustomImage
                width={100}
                height={100}
                src={`https://${process.env.NEXT_PUBLIC_NEXON_CDN_SEVER_URL}/live/externalAssets/common/playersAction/p${playerId}.png`}
                spId={playerId}
                seasonId={seasonId}
              />
            </div>
          </div>
          <Box sx={{ display: "flex", alignContent: "center" }}>
            <img style={{ height: 20, paddingRight: 5 }} src={seasonImgUrl} />
            <Typography fontWeight={"bold"}>{playerName}</Typography>
            {/* <div className="text-sm opacity-50">United States</div> */}
          </Box>
        </div>
      </td>
      <td className="text-center">
        <div>
          <Typography fontWeight={"bold"} sx={{ color: percentage == 0 ? "grey" : percentage > 0 ? "blue" : "red" }}>
            {percentage > 0 ? "+" : ""}
            {percentage}%
          </Typography>
          <div className="text-sm opacity-50">
            {todayPrice - yesterdayPrice > 0 ? "+" : ""}
            {convertPriceFormat(todayPrice - yesterdayPrice)}BP
          </div>
        </div>
      </td>
      <td className="text-center">
        <div>
          <Typography fontWeight={"bold"}>{convertPriceFormat(todayPrice)}BP</Typography>
          <div className="text-sm opacity-50">{convertKorPriceFormat(todayPrice)}</div>
        </div>
      </td>
    </tr>
  );
};

export default PlayerPriceRank;
