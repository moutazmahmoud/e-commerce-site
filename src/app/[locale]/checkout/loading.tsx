export default function CheckoutLoading() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl animate-pulse">
      <div className="h-10 bg-zinc-200 dark:bg-zinc-800 rounded-md w-48 mx-auto mb-8"></div>

      <div className="bg-white dark:bg-zinc-900 p-8 rounded-2xl shadow-sm border border-zinc-100 dark:border-zinc-800 space-y-8">
        <div className="h-6 bg-zinc-100 dark:bg-zinc-800 rounded w-1/3 mb-6"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className={i === 3 ? "md:col-span-2" : ""}>
              <div className="h-4 bg-zinc-50 dark:bg-zinc-800 rounded w-24 mb-2"></div>
              <div className="h-12 bg-zinc-100 dark:bg-zinc-800 rounded-xl w-full"></div>
            </div>
          ))}
        </div>

        <div className="flex justify-end pt-4">
          <div className="h-12 bg-zinc-200 dark:bg-zinc-800 rounded-full w-40"></div>
        </div>
      </div>
    </div>
  );
}
