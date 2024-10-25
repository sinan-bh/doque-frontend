import Link from "next/link";

export default function Notfound() {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-[#afc7e6] dark:bg-gray-700">
      <div className="text-8xl mb-6 text-gray-700 dark:text-white">
        <span>4</span>
        <span>0</span>
        <span>4</span>
      </div>
      <div>
        <div className="text-center text-2xl m-4 dark:text-white">
          <span>Page not found</span>
        </div>
        <div className="text-center text-1xl tracking-wides mb-10">
          <span>Oops! We coudn&apos;t find the page</span>
        </div>
      </div>
      <div>
        <Link href={"/"}>
          <button className="btn border text-black dark:text-white dark:hover:text-black border-gray-500 dark:border-gray-900 p-2 rounded shadow-xl hover:border-white hover:text-white">
            Back to home
          </button>
        </Link>
      </div>
    </div>
  );
}
