interface Props {
  pay: number;
  width?: number;
  height?: number;
}

export default function PlayerPay({ pay, width = 9, height = 9 }: Props) {
  return (
    <div className={`bg-[url(/images/pay/pay-border.png)] bg-no-repeat w-${width} h-${height} flex justify-center items-center`}>
      <p className={"pr-1.5 text-base font-bold text-slate-600"}>{pay}</p>
    </div>
  );
}
