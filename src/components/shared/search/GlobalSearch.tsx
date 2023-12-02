"use client";
const GlobalSearch = () => {
  return (
    <div className="py-2 px-5 bg-secondary-color-6 w-full max-w-[440px] flex items-center justify-between gap-10 h-10 rounded-lg dark:bg-dark4 dark:text-white max-lg:hidden">
      <input
        type="text"
        placeholder="Type here to search..."
        className="bg-transparent outline-none text-sm w-full"
      />
      <svg
        width={21}
        height={21}
        viewBox="0 0 21 21"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx={10} cy={9} r={8} stroke="#858EAD" strokeWidth={2} />
        <path
          d="M15.5 15.5L19.5 19.5"
          stroke="#858EAD"
          strokeWidth={2}
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};

export default GlobalSearch;
