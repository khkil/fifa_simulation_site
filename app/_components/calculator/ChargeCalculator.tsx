"use client";

import { ChangeEvent, useMemo, useState } from "react";
import { convertPriceFormat } from "@/app/_utils";

interface Price {
  price?: number;
  coupon?: number;
}

export default function ChargeCalculator() {
  const [priceList, setPriceList] = useState<Price[]>([{}]);
  const [saleList, setSaleList] = useState<Sale[]>([
    { name: "PC방 할인", amount: 30, active: true },
    { name: "TOP CLASS", amount: 20, active: true },
  ]);
  const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    let { name, value } = e.target;

    if (name === "coupon" && parseInt(value) > 50) {
      alert("수수료 쿠폰은 50%가 최대입니다.");
      value = "50";
    }
    setPriceList(priceList.map((price, x) => (x !== index ? price : { ...priceList[x], [name]: parseInt(value) })));
  };

  const addPrice = () => {
    setPriceList([...priceList, {}]);
  };

  const removePrice = (index: number) => {
    setPriceList(priceList.filter((_, x) => x !== index));
  };

  return (
    <div className={"w-full border border-gray-300 rounded-md p-3"}>
      <h2 className={"font-bold mb-5 text-xl"}>수수료 계산기</h2>
      {priceList.map(({ price, coupon }, index) => (
        <div key={index} className={"mb-3"}>
          <div className={"flex gap-4"}>
            <input
              type="number"
              name={"price"}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-4/5 p-2.5"
              placeholder="금액(BP) 입력"
              value={price}
              onChange={(e) => {
                handleChange(e, index);
              }}
            />
            <input
              type="number"
              name={"coupon"}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-1/5 p-2.5"
              placeholder="쿠폰(%)"
              value={coupon}
              onChange={(e) => {
                handleChange(e, index);
              }}
            />
            <button
              className="w-24 text-white rounded-lg text-sm p-2 bg-red-500"
              type="button"
              onClick={() => {
                removePrice(index);
              }}
            >
              삭제
            </button>
          </div>
          <p></p>
        </div>
      ))}

      <div className={"flex my-5 justify-center items-center"}>
        <button type="button" className="text-white bg-primary font-medium rounded-lg text-sm py-2.5 mb-2 w-1/6" onClick={addPrice}>
          + 선수 추가
        </button>
      </div>

      <SaleList saleList={saleList} setSaleList={setSaleList} />

      <div className={"flex space-x-4"}>
        <button type="button" className="text-white bg-gray-700 font-medium rounded-lg text-sm py-2.5 mb-2 w-1/2" onClick={() => {}}>
          수수료 계산
        </button>
        <button type="button" className="text-white bg-gray-400 font-medium rounded-lg text-sm py-2.5  mb-2 w-1/2" onClick={() => {}}>
          초기화
        </button>
      </div>

      <CalculatedPriceResultList priceList={priceList} saleList={saleList} />
    </div>
  );
}

interface Sale {
  name: string;
  amount: number;
  active: boolean;
}

interface SaleProps {
  saleList: Sale[];
  setSaleList: (sale: Sale[]) => void;
}

const SaleList = ({ saleList, setSaleList }: SaleProps) => {
  const toggleSale = (index: number, isActive: boolean) => {
    setSaleList(saleList.map((sale, x) => (x !== index ? sale : { ...sale, active: isActive })));
  };

  return (
    <div className={"flex border-b-2 pb-6 mb-4"}>
      {saleList.map(({ name, amount, active }, index) => (
        <div key={index} className={"w-1/2"}>
          <p className={"text-gray-500 font-bold mb-2"}>{name}</p>
          <div className="inline-flex rounded-md shadow-sm">
            <button
              aria-current="page"
              className={`px-4 py-2 text-sm font-medium text-gray-900 border border-gray-200 rounded-s-lg ${Boolean(active) ? "bg-gray-300" : "bg-white hover:bg-gray-100"}`}
              onClick={() => {
                toggleSale(index, true);
              }}
            >
              활성화
            </button>
            <button
              className={`px-4 py-2 text-sm font-medium text-gray-900  border border-gray-200 rounded-e-lg ${!Boolean(active) ? "bg-gray-300" : "bg-white hover:bg-gray-100"}`}
              onClick={() => {
                toggleSale(index, false);
              }}
            >
              비활성화
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

interface ResultProps {
  priceList: Price[];
  saleList: Sale[];
}

interface Result {
  originPrice: number;
  charge: number;
}

const CalculatedPriceResultList = ({ priceList, saleList }: ResultProps) => {
  const calculateCharge = (originPrice: number, coupon: number) => {
    let totalPrice = originPrice - originPrice * 0.4 + originPrice * 0.004 * coupon;
    saleList.forEach(({ amount, active }) => {
      if (active) {
        totalPrice += originPrice * 0.004 * amount;
      }
    });
    return totalPrice;
  };

  const totalPrice = useMemo<number>(
    () => priceList.reduce((sum, { price = 0, coupon = 0 }) => sum + price - calculateCharge(price, coupon), 0),
    [priceList, saleList],
  );

  return (
    <div>
      {priceList.map(({ price = 0, coupon = 0 }, index) => {
        const { originPrice, charge }: Result = { originPrice: price || 0, charge: 0 };

        return (
          <div key={index} className={"flex"}>
            <p>{convertPriceFormat(originPrice)} BP</p>
            <p className={"mx-2"}> - </p>
            <p>{convertPriceFormat(calculateCharge(price, coupon))} BP</p>
            <p className={"mx-2"}> = </p>
            <p>{convertPriceFormat(originPrice - calculateCharge(price, coupon))} BP</p>
          </div>
        );
      })}
      <div className={"border-t-2 my-2"}>{totalPrice}</div>
    </div>
  );
};
