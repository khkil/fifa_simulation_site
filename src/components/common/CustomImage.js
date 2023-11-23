import Image from "next/image";
import { useEffect, useState } from "react";
import styled from "styled-components";

const Img = styled(Image)`
  height: auto !important;
  position: relative !important;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
`;

const CustomImage = ({ src, alt, ...props }) => {
  const noImageSrc = "/images/noImg/prd_noimage.png";
  const [imgPath, setImgPath] = useState(src || noImageSrc);

  useEffect(() => {
    setImgPath(src);
  }, [src]);

  return (
    <Img
      src={imgPath}
      fill={!props.width && !props.height}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      placeholder="blur"
      alt={alt || "image"}
      blurDataURL={"data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mOcOnt2PQAF5AJMrzp1XwAAAABJRU5ErkJggg=="}
      onError={() => {
        if (props?.spId && props?.seasonId) {
          const pId = Number(props.spId.toString().replace(props.seasonId.toString(), ""));
          setImgPath(`https://${process.env.NEXT_PUBLIC_NEXON_CDN_SEVER_URL}/live/externalAssets/common/players/p${pId}.png`);
        } else {
          setImgPath(noImageSrc);
        }
      }}
      {...props}
    />
  );
};

export default CustomImage;
