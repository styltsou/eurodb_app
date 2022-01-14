const validateGender = gender => {
  if (gender !== undefined && !['Male', 'Female', 'NonBinary'].includes(gender))
    throw new Error(`'${gender}' is not valid value for gender`);
};

const validateGenre = genre => {
  if (
    genre !== undefined &&
    !['Rock', 'Pop', 'Folk', 'Metal', 'Country', 'Soul', 'Electronic'].includes(
      genre
    )
  )
    throw new Error(`'${genre}' is not valid value for genre`);
};

module.exports = {
  validateGender,
  validateGenre,
};
