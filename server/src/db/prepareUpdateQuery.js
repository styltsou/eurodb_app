module.exports = (tableName, validUpdates, newDataObj, conditionClause) => {
  // Should I add an error as a response instead?
  Object.keys(newDataObj).forEach(key => {
    if (!validUpdates.includes(key)) {
      delete newDataObj[key];
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
