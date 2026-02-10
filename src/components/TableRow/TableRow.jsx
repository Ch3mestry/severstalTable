import { useState, useCallback } from "react";
import "./TableRow.css";

function TableRow({ node, depth = 0 }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasChildren = node.children.length > 0;

  const handleToggle = useCallback(() => {
    setIsExpanded((prev) => !prev);
  }, []);

  return (
    <>
      <tr className="table-row">
        <td className="table-row__cell table-row__cell--name">
          <span
            className="table-row__name-content"
            style={{ paddingLeft: `${depth * 24}px` }}
          >
            {hasChildren ? (
              <button
                className={`table-row__toggle ${isExpanded ? "table-row__toggle--expanded" : ""}`}
                onClick={handleToggle}
                aria-label={isExpanded ? "Свернуть" : "Развернуть"}
              >
                &#9654;
              </button>
            ) : (
              <span className="table-row__toggle-placeholder" />
            )}
            {node.name}
          </span>
        </td>
        <td className="table-row__cell">{node.balance}</td>
        <td className="table-row__cell">{node.email}</td>
        <td className="table-row__cell table-row__cell--status">
          <span
            className={`table-row__badge ${node.isActive ? "table-row__badge--active" : "table-row__badge--inactive"}`}
          >
            {node.isActive ? "Active" : "Inactive"}
          </span>
        </td>
      </tr>

      {hasChildren &&
        isExpanded &&
        node.children.map((child) => (
          <TableRow key={child.id} node={child} depth={depth + 1} />
        ))}
    </>
  );
}

export default TableRow;
