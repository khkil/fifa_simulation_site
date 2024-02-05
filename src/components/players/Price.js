const { convertPriceFormat } = require("@/utils");

export default function Price({ price }) {
  return (
    <div className="flex">
      <p className="text-bp mr-1 font-semibold">{convertPriceFormat(price)}</p>
      <p className="text-bp">BP</p>
    </div>
  );
}
