"use client";

import { useEffect } from "react";
import PlayerTable from "@/app/players/_components/PlayerTable";

const playerList = [
  {
    spId: 100190043,
    playerName: "펠레",
    pay: 33,
    preferredFoot: "RIGHT",
    leftFoot: 5,
    rightFoot: 5,
    maxOverall: 125,
    priceList: [
      {
        price: 40700000000000,
        grade: 1,
      },
      {
        price: 58800000000000,
        grade: 2,
      },
      {
        price: 88200000000000,
        grade: 3,
      },
      {
        price: 141000000000000,
        grade: 4,
      },
      {
        price: 282000000000000,
        grade: 5,
      },
      {
        price: 620000000000000,
        grade: 6,
      },
      {
        price: 1490000000000000,
        grade: 7,
      },
      {
        price: 3870000000000000,
        grade: 8,
      },
      {
        price: 10800000000000000,
        grade: 9,
      },
      {
        price: 34600000000000000,
        grade: 10,
      },
    ],
    average: {
      speed: 127,
      shooting: 126,
      passing: 123,
      dribble: 127,
      defending: 87,
      physical: 120,
    },
    season: {
      id: 100,
      seasonName: "ICONTM (ICON The Moment)",
      imageUrl: "https://ssl.nexon.com/s2/game/fc/online/obt/externalAssets/season/icontm.png",
    },
    positions: [
      {
        positionName: "CF",
        overall: 125,
      },
      {
        positionName: "ST",
        overall: 125,
      },
    ],
  },
  {
    spId: 110190043,
    playerName: "펠레",
    pay: 43,
    preferredFoot: "RIGHT",
    leftFoot: 5,
    rightFoot: 5,
    maxOverall: 125,
    priceList: [
      {
        price: 2060000000000,
        grade: 1,
      },
      {
        price: 2060000000000,
        grade: 2,
      },
      {
        price: 2060000000000,
        grade: 3,
      },
      {
        price: 2060000000000,
        grade: 4,
      },
      {
        price: 2060000000000,
        grade: 5,
      },
      {
        price: 2060000000000,
        grade: 6,
      },
      {
        price: 2060000000000,
        grade: 7,
      },
      {
        price: 2060000000000,
        grade: 8,
      },
      {
        price: 2060000000000,
        grade: 9,
      },
      {
        price: 2060000000000,
        grade: 10,
      },
    ],
    average: {
      speed: 127,
      shooting: 126,
      passing: 123,
      dribble: 127,
      defending: 87,
      physical: 120,
    },
    season: {
      id: 110,
      seasonName: "ICONTM_B (ICON The Moment Bound)",
      imageUrl: "https://ssl.nexon.com/s2/game/fc/online/obt/externalAssets/season/icontm_b.png",
    },
    positions: [
      {
        positionName: "ST",
        overall: 125,
      },
      {
        positionName: "CF",
        overall: 125,
      },
    ],
  },
  {
    spId: 100037576,
    playerName: "호나우두",
    pay: 33,
    preferredFoot: "RIGHT",
    leftFoot: 5,
    rightFoot: 5,
    maxOverall: 124,
    priceList: [
      {
        price: 57000000000000,
        grade: 1,
      },
      {
        price: 79800000000000,
        grade: 2,
      },
      {
        price: 120000000000000,
        grade: 3,
      },
      {
        price: 192000000000000,
        grade: 4,
      },
      {
        price: 384000000000000,
        grade: 5,
      },
      {
        price: 845000000000000,
        grade: 6,
      },
      {
        price: 2030000000000000,
        grade: 7,
      },
      {
        price: 5280000000000000,
        grade: 8,
      },
      {
        price: 14800000000000000,
        grade: 9,
      },
      {
        price: 47400000000000000,
        grade: 10,
      },
    ],
    average: {
      speed: 131,
      shooting: 125,
      passing: 114,
      dribble: 128,
      defending: 81,
      physical: 114,
    },
    season: {
      id: 100,
      seasonName: "ICONTM (ICON The Moment)",
      imageUrl: "https://ssl.nexon.com/s2/game/fc/online/obt/externalAssets/season/icontm.png",
    },
    positions: [
      {
        positionName: "ST",
        overall: 124,
      },
    ],
  },
  {
    spId: 110037576,
    playerName: "호나우두",
    pay: 43,
    preferredFoot: "RIGHT",
    leftFoot: 5,
    rightFoot: 5,
    maxOverall: 124,
    priceList: [
      {
        price: 7320000000000,
        grade: 1,
      },
      {
        price: 7320000000000,
        grade: 2,
      },
      {
        price: 7320000000000,
        grade: 3,
      },
      {
        price: 7320000000000,
        grade: 4,
      },
      {
        price: 7320000000000,
        grade: 5,
      },
      {
        price: 7320000000000,
        grade: 6,
      },
      {
        price: 7320000000000,
        grade: 7,
      },
      {
        price: 7320000000000,
        grade: 8,
      },
      {
        price: 7320000000000,
        grade: 9,
      },
      {
        price: 7320000000000,
        grade: 10,
      },
    ],
    average: {
      speed: 131,
      shooting: 125,
      passing: 114,
      dribble: 128,
      defending: 81,
      physical: 114,
    },
    season: {
      id: 110,
      seasonName: "ICONTM_B (ICON The Moment Bound)",
      imageUrl: "https://ssl.nexon.com/s2/game/fc/online/obt/externalAssets/season/icontm_b.png",
    },
    positions: [
      {
        positionName: "ST",
        overall: 124,
      },
    ],
  },
  {
    spId: 100254642,
    playerName: "페렌츠 푸스카스",
    pay: 31,
    preferredFoot: "LEFT",
    leftFoot: 5,
    rightFoot: 4,
    maxOverall: 124,
    priceList: [
      {
        price: 5450000000000,
        grade: 1,
      },
      {
        price: 5630000000000,
        grade: 2,
      },
      {
        price: 8000000000000,
        grade: 3,
      },
      {
        price: 8000000000000,
        grade: 4,
      },
      {
        price: 16000000000000,
        grade: 5,
      },
      {
        price: 35200000000000,
        grade: 6,
      },
      {
        price: 84500000000000,
        grade: 7,
      },
      {
        price: 220000000000000,
        grade: 8,
      },
      {
        price: 616000000000000,
        grade: 9,
      },
      {
        price: 1970000000000000,
        grade: 10,
      },
    ],
    average: {
      speed: 126,
      shooting: 126,
      passing: 120,
      dribble: 126,
      defending: 81,
      physical: 119,
    },
    season: {
      id: 100,
      seasonName: "ICONTM (ICON The Moment)",
      imageUrl: "https://ssl.nexon.com/s2/game/fc/online/obt/externalAssets/season/icontm.png",
    },
    positions: [
      {
        positionName: "CF",
        overall: 124,
      },
    ],
  },
  {
    spId: 110254642,
    playerName: "페렌츠 푸스카스",
    pay: 41,
    preferredFoot: "LEFT",
    leftFoot: 5,
    rightFoot: 4,
    maxOverall: 124,
    priceList: [
      {
        price: 1040000000000,
        grade: 1,
      },
      {
        price: 1040000000000,
        grade: 2,
      },
      {
        price: 1040000000000,
        grade: 3,
      },
      {
        price: 1040000000000,
        grade: 4,
      },
      {
        price: 1040000000000,
        grade: 5,
      },
      {
        price: 1040000000000,
        grade: 6,
      },
      {
        price: 1040000000000,
        grade: 7,
      },
      {
        price: 1040000000000,
        grade: 8,
      },
      {
        price: 1040000000000,
        grade: 9,
      },
      {
        price: 1040000000000,
        grade: 10,
      },
    ],
    average: {
      speed: 126,
      shooting: 126,
      passing: 120,
      dribble: 126,
      defending: 81,
      physical: 119,
    },
    season: {
      id: 110,
      seasonName: "ICONTM_B (ICON The Moment Bound)",
      imageUrl: "https://ssl.nexon.com/s2/game/fc/online/obt/externalAssets/season/icontm_b.png",
    },
    positions: [
      {
        positionName: "CF",
        overall: 124,
      },
    ],
  },
  {
    spId: 100001397,
    playerName: "지네딘 지단",
    pay: 33,
    preferredFoot: "RIGHT",
    leftFoot: 5,
    rightFoot: 5,
    maxOverall: 124,
    priceList: [
      {
        price: 13600000000000,
        grade: 1,
      },
      {
        price: 15200000000000,
        grade: 2,
      },
      {
        price: 21000000000000,
        grade: 3,
      },
      {
        price: 33600000000000,
        grade: 4,
      },
      {
        price: 67200000000000,
        grade: 5,
      },
      {
        price: 148000000000000,
        grade: 6,
      },
      {
        price: 355000000000000,
        grade: 7,
      },
      {
        price: 923000000000000,
        grade: 8,
      },
      {
        price: 2580000000000000,
        grade: 9,
      },
      {
        price: 8260000000000000,
        grade: 10,
      },
    ],
    average: {
      speed: 120,
      shooting: 122,
      passing: 124,
      dribble: 127,
      defending: 103,
      physical: 118,
    },
    season: {
      id: 100,
      seasonName: "ICONTM (ICON The Moment)",
      imageUrl: "https://ssl.nexon.com/s2/game/fc/online/obt/externalAssets/season/icontm.png",
    },
    positions: [
      {
        positionName: "LM",
        overall: 124,
      },
      {
        positionName: "CM",
        overall: 123,
      },
      {
        positionName: "CAM",
        overall: 124,
      },
    ],
  },
  {
    spId: 110001397,
    playerName: "지네딘 지단",
    pay: 43,
    preferredFoot: "RIGHT",
    leftFoot: 5,
    rightFoot: 5,
    maxOverall: 124,
    priceList: [
      {
        price: 1570000000000,
        grade: 1,
      },
      {
        price: 1570000000000,
        grade: 2,
      },
      {
        price: 1570000000000,
        grade: 3,
      },
      {
        price: 1570000000000,
        grade: 4,
      },
      {
        price: 1570000000000,
        grade: 5,
      },
      {
        price: 1570000000000,
        grade: 6,
      },
      {
        price: 1570000000000,
        grade: 7,
      },
      {
        price: 1570000000000,
        grade: 8,
      },
      {
        price: 1570000000000,
        grade: 9,
      },
      {
        price: 1570000000000,
        grade: 10,
      },
    ],
    average: {
      speed: 120,
      shooting: 122,
      passing: 124,
      dribble: 127,
      defending: 103,
      physical: 118,
    },
    season: {
      id: 110,
      seasonName: "ICONTM_B (ICON The Moment Bound)",
      imageUrl: "https://ssl.nexon.com/s2/game/fc/online/obt/externalAssets/season/icontm_b.png",
    },
    positions: [
      {
        positionName: "CM",
        overall: 123,
      },
      {
        positionName: "LM",
        overall: 124,
      },
      {
        positionName: "CAM",
        overall: 124,
      },
    ],
  },
  {
    spId: 100190045,
    playerName: "요한 크루이프",
    pay: 32,
    preferredFoot: "RIGHT",
    leftFoot: 5,
    rightFoot: 5,
    maxOverall: 124,
    priceList: [
      {
        price: 5640000000000,
        grade: 1,
      },
      {
        price: 5970000000000,
        grade: 2,
      },
      {
        price: 8210000000000,
        grade: 3,
      },
      {
        price: 8210000000000,
        grade: 4,
      },
      {
        price: 16400000000000,
        grade: 5,
      },
      {
        price: 36100000000000,
        grade: 6,
      },
      {
        price: 86600000000000,
        grade: 7,
      },
      {
        price: 225000000000000,
        grade: 8,
      },
      {
        price: 630000000000000,
        grade: 9,
      },
      {
        price: 2020000000000000,
        grade: 10,
      },
    ],
    average: {
      speed: 127,
      shooting: 122,
      passing: 121,
      dribble: 125,
      defending: 89,
      physical: 117,
    },
    season: {
      id: 100,
      seasonName: "ICONTM (ICON The Moment)",
      imageUrl: "https://ssl.nexon.com/s2/game/fc/online/obt/externalAssets/season/icontm.png",
    },
    positions: [
      {
        positionName: "CF",
        overall: 124,
      },
    ],
  },
  {
    spId: 110190045,
    playerName: "요한 크루이프",
    pay: 42,
    preferredFoot: "RIGHT",
    leftFoot: 5,
    rightFoot: 5,
    maxOverall: 124,
    priceList: [
      {
        price: 1410000000000,
        grade: 1,
      },
      {
        price: 1410000000000,
        grade: 2,
      },
      {
        price: 1410000000000,
        grade: 3,
      },
      {
        price: 1410000000000,
        grade: 4,
      },
      {
        price: 1410000000000,
        grade: 5,
      },
      {
        price: 1410000000000,
        grade: 6,
      },
      {
        price: 1410000000000,
        grade: 7,
      },
      {
        price: 1410000000000,
        grade: 8,
      },
      {
        price: 1410000000000,
        grade: 9,
      },
      {
        price: 1410000000000,
        grade: 10,
      },
    ],
    average: {
      speed: 127,
      shooting: 122,
      passing: 121,
      dribble: 125,
      defending: 89,
      physical: 117,
    },
    season: {
      id: 110,
      seasonName: "ICONTM_B (ICON The Moment Bound)",
      imageUrl: "https://ssl.nexon.com/s2/game/fc/online/obt/externalAssets/season/icontm_b.png",
    },
    positions: [
      {
        positionName: "CF",
        overall: 124,
      },
    ],
  },
];

export default function PlayerListPage() {
  return (
    <div>
      <PlayerTable playerList={playerList} />
    </div>
  );
}
