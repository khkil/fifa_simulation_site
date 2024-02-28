interface Props {
  pay: number;
}

export default function PlayerPay({ pay }: Props) {
  return (
    <div className={`relative bg-[url(/images/pay/pay-border.png)] bg-no-repeat w-9 h-9 flex justify-center items-center`}>
      <p className={"pr-1.5 text-base font-bold text-slate-600"}>{pay}</p>
    </div>
  );
}
