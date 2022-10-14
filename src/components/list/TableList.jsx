import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { formatIndicator } from "../../utility/utils";

const TableList = ({ rows, indicator }) => {
  const header = ["#", "Fecha", "Valor", "Detalles"];
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    const itemsPerPage = 10;
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(rows.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(rows.length / itemsPerPage));
  }, [itemOffset, rows]);

  const handlePageClick = (event) => {
    const itemsPerPage = 10;
    const newOffset = (event.selected * itemsPerPage) % rows.length;
    setItemOffset(newOffset);
  };

  return (
    <div className="table-list">
      <table>
        <tbody>
          <tr>
            {header.map((h, idx) => (
              <th key={idx}>{h}</th>
            ))}
          </tr>
          {currentItems.map((r, idx) => (
            <tr key={idx}>
              <td data-th={header[0]}>{r.id}</td>
              <td data-th={header[1]}>{r.fecha}</td>
              <td data-th={header[2]}>{formatIndicator(r.valor, indicator)}</td>
              <td data-th={header[3]}>
                {!!(r.diff_with_prev !== null) ? (
                  r.diff_with_prev === 0 ? (
                    <span>=</span>
                  ) : (
                    <span className={r.diff_with_prev < 0 ? "red" : "green"}>
                      {`${r.diff_with_prev > 0 ? "+" : ""}${
                        Math.round(r.diff_with_prev * 100) / 100
                      }%`}
                    </span>
                  )
                ) : (
                  ""
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="table-footer">
        <div className="pagination">
          <ReactPaginate
            breakLabel="..."
            nextLabel=">>"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel="<<"
            renderOnZeroPageCount={null}
          />
        </div>
      </div>
    </div>
  );
};

export default TableList;
