export const removeWhiteSpace = (str) => {};

export const addASpace = (str) => {
  return str.replace(/-/g, " ");
};

export const addHyphen = (str) => {
  return str.replace(/\s+/g, "-");
};

//this might be too much abstraction?
export const getDataName = (el) => {
  return el.dataset.name;
};
