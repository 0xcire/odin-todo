export const addASpace = (str) => str.replace(/-/g, ' ');

export const addHyphen = (str) => str.replace(/\s+/g, '-');

export const enableTabbing = (nodes) => {
  const domNodes = nodes;
  for (let i = 0; i < domNodes.length; i += 1) {
    domNodes[i].tabIndex = 0;
  }
};

export const disableTabbing = (nodes) => {
  const domNodes = nodes;
  for (let i = 0; i < domNodes.length; i += 1) {
    domNodes[i].tabIndex = -1;
  }
};
