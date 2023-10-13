import Image from "next/image";
import { useState } from "react";
import styled from "styled-components";

const Img = styled(Image)`
  height: auto !important;
  position: relative !important;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  border-radius: 15px;
`;

const CustomImage = ({ src, alt, ...props }) => {
  const noImageSrc = "/images/noImg/prd_noimage.png";
  const [imgPath, setImgPath] = useState(src || noImageSrc);
  return (
    <Img
      src={imgPath}
      fill={!props.width && !props.height}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      placeholder="blur"
      alt={alt || "image"}
      blurDataURL={"data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mOcOnt2PQAF5AJMrzp1XwAAAABJRU5ErkJggg=="}
      onError={() => {
        if (props?.spId) {
          const pId = Number(props.spId.toString().substring(5, 9));
          setImgPath(`https://${process.env.NEXT_PUBLIC_NEXON_CDN_SEVER_URL}/live/externalAssets/common/players/p${pId}.png`);
        } else {
          setImgPath(noImageSrc);
        }
      }}
      {...props}
    />
  );
};

// 추후 이미지 로더 필요하면 사용
const imageLoader = ({ src, width, quality }) => {
  const url = `${src}?w=${width}&q=${quality || 50}`;
  return url;
};

export default CustomImage;
