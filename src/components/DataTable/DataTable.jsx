import { useState, useMemo } from "react";
import { buildTree, sortTree, filterTree } from "../../utils/tree";
import TableRow from "../TableRow/TableRow";
import "./DataTable.css";

const FILTER_OPTIONS = [
  { value: "all", label: "All" },
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
];

const SORTABLE_COLUMNS = [
  { key: "balance", label: "Balance" },
  { key: "email", label: "Email" },
];

function DataTable({ data }) {
  const [activeFilter, setActiveFilter] = useState("all");
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const getSortIndicator = (field) => {
    if (sortField !== field) return " \u2195";
    return sortDirection === "asc" ? " \u2191" : " \u2193";
  };

  const filterValue = useMemo(() => {
    if (activeFilter === "active") return true;
    if (activeFilter === "inactive") return false;
    return null;
  }, [activeFilter]);

  const tree = useMemo(() => {
    let result = buildTree(data);
    result = filterTree(result, filterValue);
    if (sortField) {
      result = sortTree(result, sortField, sortDirection);
    }
    return result;
  }, [data, filterValue, sortField, sortDirection]);

  return (
    <div className="data-table">
      <div className="data-table__toolbar">
        <div className="data-table__filter">
          <span className="data-table__filter-label">Status:</span>
          {FILTER_OPTIONS.map((option) => (
            <button
              key={option.value}
              className={`data-table__filter-btn ${activeFilter === option.value ? "data-table__filter-btn--active" : ""}`}
              onClick={() => setActiveFilter(option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div className="data-table__wrapper">
        <table className="data-table__table">
          <thead>
            <tr>
              <th className="data-table__header">Name</th>
              {SORTABLE_COLUMNS.map((col) => (
                <th
                  key={col.key}
                  className="data-table__header data-table__header--sortable"
                  onClick={() => handleSort(col.key)}
                >
                  {col.label}
                  <span className="data-table__sort-indicator">
                    {getSortIndicator(col.key)}
                  </span>
                </th>
              ))}
              <th className="data-table__header data-table__header--center">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {tree.length > 0 ? (
              tree.map((node) => <TableRow key={node.id} node={node} />)
            ) : (
              <tr>
                <td className="data-table__empty" colSpan={4}>
                  No records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DataTable;
