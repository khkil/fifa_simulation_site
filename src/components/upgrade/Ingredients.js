const Ingredients = ({ overall, ingredients, setIngredients }) => {
  return (
    <div className="w-full p-5">
      {JSON.stringify(ingredients)}
      <div className="flex h-64">
        {Array.from({ length: 5 }, (_, index) => index).map((v) => (
          <div class="flex min-h-full justify-center items-center bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 w-1/5">
            asd
          </div>
        ))}
      </div>
    </div>
  );
};

export default Ingredients;
