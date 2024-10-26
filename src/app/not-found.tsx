"use client"

export default function Notfound() {
  const handleBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      window.history.back();
    } else {
      window.location.href = "/";
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-[#afc7e6] dark:bg-gray-700">
      <div className="text-8xl mb-6 text-gray-600 dark:text-white">
        <h1>404</h1>
      </div>
      <div>
        <div className="text-center text-2xl m-4 dark:text-white">
          <span>Page not found</span>
        </div>
        <div className="text-center text-1xl tracking-wides mb-10">
          <p><span className="font-semibold text-gray-800">Oops!</span> We coudn&apos;t find the page</p>
        </div>
      </div>
      <div>
        <button
          onClick={handleBack}
          className="btn border text-black dark:text-white dark:hover:text-black border-gray-500 dark:border-gray-900 p-2 rounded shadow-xl hover:border-white hover:text-white"
        >
          Back to previous page
        </button>
      </div>
    </div>
  );
}
