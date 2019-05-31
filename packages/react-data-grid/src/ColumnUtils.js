export function getColumn(columns, idx) {
  if (Array.isArray(columns)) {
    return columns[idx];
  } else if (typeof Immutable !== 'undefined') {
    return columns.get(idx);
  }
}

export function spliceColumn(metrics, idx, column) {
  if (Array.isArray(metrics.columns)) {
    metrics.columns.splice(idx, 1, column);
  } else if (typeof Immutable !== 'undefined') {
    metrics.columns = metrics.columns.splice(idx, 1, column);
  }
  return metrics;
}

// Logic extented to allow for functions to be passed down in column.editable
// this allows us to deicde whether we can be edting from a cell level
export function canEdit(col, rowData, enableCellSelect) {
  if (!col) return false;
  if (col.editable != null && typeof (col.editable) === 'function') {
    return enableCellSelect === true && col.editable(rowData);
  }

  if (enableCellSelect === true) {
    if (col.editable === false && col.editor != null) {
      return false;
    }

    return !!col.editor || !!col.editable;
  }

  return false;
}

export function getValue(column, property) {
  let value;
  if (column.toJSON && column.get) {
    value = column.get(property);
  } else {
    value = column[property];
  }
  return value;
}

export function isFrozen(column) {
  return column.locked === true || column.frozen === true;
}

