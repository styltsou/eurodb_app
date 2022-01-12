const validateGender = gender => {
  if (gender !== undefined && !['Male', 'Female', 'NonBinary'].includes(gender))
    throw new Error(`${gender} is not valid value for gender`);
};

module.exports = {
  validateGender,
};
