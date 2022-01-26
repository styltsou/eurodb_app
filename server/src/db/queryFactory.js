const insertQuery = ({ table, validInserts, data }) => {
  Object.keys(data).forEach(key => {
    if (!validInserts.includes(key)) {
      throw new Error(`'${key}' is not a valid field`);
    }
  });

  let insertFields = '';
  let values = '';

  Object.keys(data).forEach(key => {
    insertFields += `${key}, `;

    if (typeof data[key] === 'string' || data[key] instanceof String)
      values += `'${data[key]}', `;
    else values += `${data[key]}, `;
  });

  insertFields = insertFields.slice(0, -2);
  values = values.slice(0, -2);

  return `INSERT INTO ${table} (${insertFields}) VALUES (${values})`;
};

const updateQuery = (table, validUpdates, data, condition) => {
  Object.keys(newDataObj).forEach(key => {
    if (!validUpdates.includes(key)) {
      throw new Error(`'${key}' is not a valid field`);
    }
  });

  // Create update pairs here
  let updatePairs = '';

  Object.keys(data).forEach(key => {
    if (typeof data[key] === 'string' || data[key] instanceof String)
      updatePairs += `${key} = '${data[key]}', `;
    else updatePairs += `${key} = ${data[key]}, `;
  });

  // Remove the extra comma and space at the end of the string
  updatePairs = updatePairs.slice(0, -2);

  return `UPDATE ${table} SET ${updatePairs} WHERE ${condition}`;
};

module.exports = {
  insertQuery,
  updateQuery,
};
