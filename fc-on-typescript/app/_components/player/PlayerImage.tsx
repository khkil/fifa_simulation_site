"use client";

import Image from "next/image";
import { useState } from "react";

/* height: auto !important;
  position: relative !important;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px; */

interface Props {
  spId: number;
  width?: number;
  height?: number;
}

export default function CustomImage({ spId, width = 50, height = 50 }: Props) {
  const playerImageSrc = `https://${process.env.NEXT_PUBLIC_NEXON_CDN_SEVER_URL}/live/externalAssets/common/playersAction/p${spId}.png`;
  const [imgPath, setImgPath] = useState<string>(playerImageSrc);

  return (
    <Image
      src={imgPath}
      width={width}
      height={height}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      placeholder="blur"
      alt="선수 이미지"
      blurDataURL={"data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mOcOnt2PQAF5AJMrzp1XwAAAABJRU5ErkJggg=="}
      onError={() => {
        const pId = Number(spId.toString().substring(3));
        setImgPath(`https://${process.env.NEXT_PUBLIC_NEXON_CDN_SEVER_URL}/live/externalAssets/common/players/p${pId}.png`);
      }}
    />
  );
}
