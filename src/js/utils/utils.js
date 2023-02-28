export const addASpace = (str) => str.replace(/-/g, ' ');

export const addHyphen = (str) => str.replace(/\s+/g, '-');

export const getDatasetName = (e) => e.target.closest('.list').dataset.name;
