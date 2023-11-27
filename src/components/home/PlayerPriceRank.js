import { convertPriceFormat } from "@/utils";
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
        <span>{title}</span>
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>선수명</th>
                <th>변동 퍼센트(%)</th>
                <th>변동금액</th>
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
      <td>
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
      <td>
        <Typography fontWeight={"bold"} sx={{ color: percentage == 0 ? "grey" : percentage > 0 ? "blue" : "red" }}>
          {percentage}%
        </Typography>
      </td>
      <td>
        <Typography fontWeight={"bold"}>{convertPriceFormat(todayPrice - yesterdayPrice)}BP</Typography>
      </td>
    </tr>
  );
};

export default PlayerPriceRank;
