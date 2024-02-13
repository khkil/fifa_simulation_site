import Link from "next/link";

export default function NotFound() {
  return (
    <section>
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center">
          <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 ">404</h1>
          <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl">페이지를 찾을수 없습니다.</p>
          <p className="mb-4 text-lg font-light text-gray-500">죄송합니다. 해당 페이지를 찾을 수 없습니다. 해당 페이지는 유효한 페이지가 아닙니다.</p>
          <Link
            href="/"
            className="inline-flex text-white bg-primary hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center my-4"
          >
            홈페이지로 이동
          </Link>
        </div>
      </div>
    </section>
  );
}
