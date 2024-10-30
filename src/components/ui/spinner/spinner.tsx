export default function Spinner() {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="flex flex-col">
          <div className="flex space-x-2 text-4xl font-extrabold tracking-widest text-white">
            <span className="rounded-lg text-gray-600 dark:text-white animate-bounceDelay bg-gradient-to-r from-white to-gray-600 dark:from-slate-900 dark:to-slate-700" style={{ animationDelay: '0.1s' }}>D</span>
            <span className="rounded-lg text-gray-600 dark:text-white animate-bounceDelay bg-gradient-to-r from-white to-gray-600 dark:from-slate-900 dark:to-slate-700" style={{ animationDelay: '0.2s' }}>O</span>
            <span className="rounded-lg text-gray-600 dark:text-white animate-bounceDelay bg-gradient-to-r from-white to-gray-600 dark:from-slate-900 dark:to-slate-700" style={{ animationDelay: '0.1s' }}>Q</span>
            <span className="rounded-lg text-gray-600 dark:text-white animate-bounceDelay bg-gradient-to-r from-white to-gray-600 dark:from-slate-900 dark:to-slate-700" style={{ animationDelay: '0.2s' }}>U</span>
            <span className="rounded-lg text-gray-600 dark:text-white animate-bounceDelay bg-gradient-to-r from-white to-gray-600 dark:from-slate-900 dark:to-slate-700" style={{ animationDelay: '0.1s' }}>E</span>
          </div>
          <div className="flex text-4xl justify-center tracking-widest">
              <span className="text-gray-600 dark:text-white px-2 animate-bounceDelay" style={{ animationDelay: '0.1s' }}>.</span>
              <span className="text-gray-600 dark:text-white px-2 animate-bounceDelay" style={{ animationDelay: '0.2s' }}>.</span>
              <span className="text-gray-600 dark:text-white px-2 animate-bounceDelay" style={{ animationDelay: '0.1s' }}>.</span>
              <span className="text-gray-600 dark:text-white px-2 animate-bounceDelay" style={{ animationDelay: '0.2s' }}>.</span>
              <span className="text-gray-600 dark:text-white px-2 animate-bounceDelay" style={{ animationDelay: '0.1s' }}>.</span>
          </div>
      </div>
    </div>
  );
}
