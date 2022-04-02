// Get or set localstorage (and handle if storage is accessible - i.e. no cookies allowed)

export function getData(key) {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch (err) {
    return false;
  }
};

export function setData(key, item) {
  try {
    return localStorage.setItem(key, JSON.stringify(item));
  } catch (err) {
    return false;
  }
};