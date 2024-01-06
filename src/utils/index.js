const isEmpty = (obj) => {
  if (obj === null) return true;

  return Object.values(obj).length === 0;
};

export default { isEmpty };
