import { useState } from "react";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";

interface PaginationInterface {
  total: number;
  itemsPerPage: number;
  showJumpers: boolean;
  onPageChange: (value: number) => void;
  delta: number;
}

function Pagination({
  total,
  itemsPerPage,
  showJumpers,
  onPageChange,
  delta,
}: PaginationInterface) {
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = Math.ceil(total / itemsPerPage);

  const prevHandler = () => {
    if (currentPage > 0) {
      setPage(currentPage - 1);
    }
  };

  const setPage = (page: number) => {
    setCurrentPage(page);
    onPageChange(page);
  };

  const nextHandler = () => {
    if (currentPage < totalPages - 1) {
      setPage(currentPage + 1);
    }
  };

  const getPaginationRange = () => {
    const range: (number | "...")[] = [];
    for (let i = 0; i < totalPages; i++) {
      if (
        i == 0 ||
        i === totalPages - 1 ||
        (i >= currentPage - delta && i <= currentPage + delta)
      ) {
        range.push(i);
      } else if (range[range.length - 1] != "...") {
        range.push("...");
      }
    }

    return range;
  };

  const handleClick = (page: number | "...") => {
    if (typeof page === "number") {
      setCurrentPage(page);
    }
  };

  const paginationItems = getPaginationRange();
  return (
    <div className="pagination-container">
      {showJumpers && (
        <GrFormPrevious
          onClick={() => prevHandler()}
          className={`${currentPage === 0 ? "disabled" : "action"}`}
        />
      )}
      {paginationItems.map((page: number | "...", index: number) => {
        if (page === "...") {
          return (
            <span key={index} className="ellipsis">
              ...
            </span>
          );
        }
        return (
          <div
            key={index}
            onClick={() => handleClick(page)}
            className={`block ${currentPage === page && "active"}`}
          >
            {page + 1}
          </div>
        );
      })}
      {showJumpers && (
        <GrFormNext
          onClick={() => nextHandler()}
          className={`${
            currentPage === totalPages - 1 ? "disabled" : "action"
          }`}
        />
      )}
    </div>
  );
}

export default Pagination;
