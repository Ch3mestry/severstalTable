import { useState, useMemo } from "react";
import { buildTree, sortTree, filterTree } from "../../utils/tree";
import TableRow from "../TableRow/TableRow";
import styles from "./DataTable.module.css";

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
    <div className={styles.root}>
      <div className={styles.toolbar}>
        <div className={styles.filter}>
          <span className={styles.filterLabel}>Status:</span>
          {FILTER_OPTIONS.map((option) => (
            <button
              key={option.value}
              className={`${styles.filterBtn} ${activeFilter === option.value ? styles.filterBtnActive : ""}`}
              onClick={() => setActiveFilter(option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.wrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.header}>Name</th>
              {SORTABLE_COLUMNS.map((col) => (
                <th
                  key={col.key}
                  className={`${styles.header} ${styles.headerSortable}`}
                  onClick={() => handleSort(col.key)}
                >
                  {col.label}
                  <span className={styles.sortIndicator}>
                    {getSortIndicator(col.key)}
                  </span>
                </th>
              ))}
              <th className={`${styles.header} ${styles.headerCenter}`}>
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {tree.length > 0 ? (
              tree.map((node) => <TableRow key={node.id} node={node} />)
            ) : (
              <tr>
                <td className={styles.empty} colSpan={4}>
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
