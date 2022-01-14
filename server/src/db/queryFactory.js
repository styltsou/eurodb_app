const insertQuery = (tableName, validInserts, dataObj) => {
  // maybe throw error instead
  Object.keys(dataObj).forEach(key => {
    if (!validInserts.includes(key)) {
      throw new Error(`'${key}' is not a valid field`);
    }
  });

  let insertFields = '';
  let values = '';

  Object.keys(dataObj).forEach(key => {
    insertFields += `${key}, `;

    if (typeof dataObj[key] === 'string' || dataObj[key] instanceof String)
      values += `'${dataObj[key]}', `;
    else values += `${dataObj[key]}, `;
  });

  insertFields = insertFields.slice(0, -2);
  values = values.slice(0, -2);

  return `INSERT INTO ${tableName} (${insertFields}) VALUES (${values})`;
};

const updateQuery = (tableName, validUpdates, newDataObj, conditionClause) => {
  // Should I add an error as a response instead?
  Object.keys(newDataObj).forEach(key => {
    if (!validUpdates.includes(key)) {
      throw new Error(`'${key}' is not a valid field`);
    }
  });

  // Create update pairs here
  let updatePairs = '';

  Object.keys(newDataObj).forEach(key => {
    if (
      typeof newDataObj[key] === 'string' ||
      newDataObj[key] instanceof String
    )
      updatePairs += `${key} = '${newDataObj[key]}', `;
    else updatePairs += `${key} = ${newDataObj[key]}, `;
  });

  // Remove the extra comma and space at the end orf the string
  updatePairs = updatePairs.slice(0, -2);

  return `UPDATE ${tableName} SET ${updatePairs} WHERE ${conditionClause}`;
};

module.exports = {
  insertQuery,
  updateQuery,
};
