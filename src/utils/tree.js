export function parseBalance(balanceStr) {
  return parseFloat(balanceStr.replace(/[$,]/g, ""));
}

export function buildTree(items) {
  const map = new Map();
  const roots = [];

  items.forEach((item) => {
    map.set(item.id, { ...item, children: [] });
  });

  map.forEach((node) => {
    if (node.parentId === 0) {
      roots.push(node);
    } else {
      const parent = map.get(node.parentId);
      if (parent) {
        parent.children.push(node);
      }
    }
  });

  return roots;
}

export function sortTree(nodes, field, direction) {
  const comparator = (a, b) => {
    let valA, valB;

    if (field === "balance") {
      valA = parseBalance(a.balance);
      valB = parseBalance(b.balance);
    } else {
      valA = a[field].toLowerCase();
      valB = b[field].toLowerCase();
    }

    if (valA < valB) return direction === "asc" ? -1 : 1;
    if (valA > valB) return direction === "asc" ? 1 : -1;
    return 0;
  };

  return nodes
    .map((node) => ({
      ...node,
      children: node.children.length
        ? sortTree(node.children, field, direction)
        : node.children,
    }))
    .sort(comparator);
}

export function filterTree(nodes, isActiveFilter) {
  if (isActiveFilter === null) return nodes;

  return nodes.reduce((acc, node) => {
    const filteredChildren = filterTree(node.children, isActiveFilter);

    if (node.isActive === isActiveFilter || filteredChildren.length > 0) {
      acc.push({ ...node, children: filteredChildren });
    }

    return acc;
  }, []);
}
