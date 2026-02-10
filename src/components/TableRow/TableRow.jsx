import { useState, useCallback } from "react";
import styles from "./TableRow.module.css";

function TableRow({ node, depth = 0 }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasChildren = node.children.length > 0;

  const handleToggle = useCallback(() => {
    setIsExpanded((prev) => !prev);
  }, []);

  return (
    <>
      <tr className={styles.row}>
        <td className={`${styles.cell} ${styles.cellName}`}>
          <span
            className={styles.nameContent}
            style={{ paddingLeft: `${depth * 24}px` }}
          >
            {hasChildren ? (
              <button
                className={`${styles.toggle} ${isExpanded ? styles.toggleExpanded : ""}`}
                onClick={handleToggle}
                aria-label={isExpanded ? "Collapse" : "Expand"}
              >
                &#9654;
              </button>
            ) : (
              <span className={styles.togglePlaceholder} />
            )}
            {node.name}
          </span>
        </td>
        <td className={styles.cell}>{node.balance}</td>
        <td className={styles.cell}>{node.email}</td>
        <td className={`${styles.cell} ${styles.cellStatus}`}>
          <span
            className={`${styles.badge} ${node.isActive ? styles.badgeActive : styles.badgeInactive}`}
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
