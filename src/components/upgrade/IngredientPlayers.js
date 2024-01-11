const IngredientPlayers = () => {
  return (
    <div className="p-5">
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

export default IngredientPlayers;
