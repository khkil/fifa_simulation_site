"use client";

import { useEffect, useRef } from "react";
import { number } from "prop-types";

interface Props {
  width: number;
  height: number;
  unit: string;
}
export default function KakaoBanner({ width, height, unit }: Props) {
  const scriptElementWrapper = useRef(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.setAttribute("src", "https://t1.daumcdn.net/kas/static/ba.min.js");
    // @ts-ignore
    scriptElementWrapper.current.appendChild(script);

    return () => {
      // @ts-ignore
      if (window.adfit) window.adfit.destroy(unit);
    };
  }, []);

  return (
    <div ref={scriptElementWrapper}>
      <ins className="kakao_ad_area" style={{ display: "none" }} data-ad-unit={unit} data-ad-width={width} data-ad-height={height}></ins>
    </div>
  );
}
