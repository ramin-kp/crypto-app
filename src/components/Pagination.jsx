import React from "react";

export default function Pagination({ page, setPage }) {
  const pageDecreaseHandler = () => {
    if (page < 2) return;
    setPage((page) => page - 1);
  };
  const pageIncreaseHandler = () => {
    if (page > 9) return;
    setPage((page) => page + 1);
  };
  return (
    <div className="flex-center w-full py-10 my-5 font-medium text-base md:text-lg text-white child:border child:border-blue-500">
      <button
        className={`px-2.5 md:px-3 py-1 md:py-2 mx-2 md:mx-5 ${
          page === 1 ? "bg-blue-500/40" : "bg-blue-500 hover:bg-blue-600"
        }  rounded`}
        onClick={pageDecreaseHandler}
        disabled={page === 1}
      >
        prevues
      </button>
      <button
        className={`px-2.5 md:px-3 py-1 md:py-2 ${
          page === 1 ? "bg-blue-500" : "bg-transparent"
        }  hover:bg-blue-600 rounded`}
        onClick={() => setPage(1)}
      >
        1
      </button>
      <button
        className={`px-2.5 md:px-3 py-1 md:py-2 mx-2 mr-6 md:mr-12 ${
          page === 2 ? "bg-blue-500" : "bg-transparent"
        } hover:bg-blue-600 rounded`}
        onClick={() => setPage(2)}
      >
        2
      </button>

      {page > 2 && page < 9 ? (
        <span className="px-2.5 md:px-3 py-1 md:py-2 bg-blue-500 rounded">
          {page}
        </span>
      ) : (
        "..."
      )}
      <button
        className={`px-2.5 md:px-3 py-1 md:py-2 mx-2 ml-6 md:ml-12 ${
          page === 9 ? "bg-blue-500" : "bg-transparent"
        } hover:bg-blue-600 rounded`}
        onClick={() => setPage(9)}
      >
        9
      </button>
      <button
        className={`px-2.5 md:px-3 py-1 md:py-2 ${
          page === 10 ? "bg-blue-500" : "bg-transparent"
        } hover:bg-blue-600 rounded`}
        onClick={() => setPage(10)}
      >
        10
      </button>
      <button
        className={`px-2.5 md:px-3 py-1 md:py-2 mx-2 md:mx-5 ${
          page === 10 ? "bg-blue-500/40" : "bg-blue-500 hover:bg-blue-600"
        } rounded`}
        onClick={pageIncreaseHandler}
        disabled={page === 10}
      >
        next
      </button>
    </div>
  );
}
