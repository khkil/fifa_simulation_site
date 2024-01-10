const TargetPlayer = () => {
  return (
    <div className="px-10">
      <div iv className="w-full bg-gray-100 border border-gray-200 rounded-lg shadow">
        <div className="flex flex-col items-center p-10">
          <img
            className="w-24 h-24 mb-3 rounded-full shadow-lg"
            src="http://localhost:3001/_next/image?url=https%3A%2F%2Ffco.dn.nexoncdn.co.kr%2Flive%2FexternalAssets%2Fcommon%2FplayersAction%2Fp110190043.png&w=828&q=75"
            alt="Bonnie image"
          />
          <h5 className="mb-1 text-xl font-medium text-gray-900">Bonnie Green</h5>
          <span className="text-sm text-black">Visual Designer</span>
          <div className="flex mt-4 md:mt-6">
            <a
              href="#"
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Add friend
            </a>
            <a
              href="#"
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700 ms-3"
            >
              Message
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TargetPlayer;
