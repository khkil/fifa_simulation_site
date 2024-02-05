import CustomImage from "../common/CustomImage";

const Ingredients = ({ overall, ingredients, setIngredients }) => {
  return (
    <div className="w-full p-5">
      <div className="flex h-36">
        {Array.from({ length: process.env.NEXT_PUBLIC_FC_ONLINE_MAX_UPGRADE_CARD_COUNT }, (_, index) => index).map((v) => (
          <div class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            {ingredients[v] ? <Ingredient ingredient={ingredients[v]} /> : <></>}
          </div>
        ))}
      </div>
    </div>
  );
};

const Ingredient = ({ ingredient }) => {
  return (
    <div>
      <div class="flex flex-col items-center py-2">
        <CustomImage
          width={70}
          height={70}
          src={`https://${process.env.NEXT_PUBLIC_NEXON_CDN_SEVER_URL}/live/externalAssets/common/playersAction/p${ingredient.spId}.png`}
          spId={ingredient.spId}
          seasonId={ingredient.season.id}
        />
        <div className="flex py-2 px-0.5">
          <img className="w-5 h-5 mr-1" src={ingredient.season.imageUrl} />
          <p class="mb-1 text-sm font-medium text-gray-900">{ingredient.playerName}</p>
        </div>
        <span class="text-sm text-gray-500 dark:text-gray-400">{ingredient.overall}</span>
      </div>
    </div>
  );
};

export default Ingredients;
