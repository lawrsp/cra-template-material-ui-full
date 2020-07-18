export const locationContainPath = (location, path) => {
  const pathLength = path.length;
  if (location.slice(0, pathLength) !== path) {
    return false;
  }
  if (location.length > pathLength) {
    const nextChar = location[pathLength];
    if (nextChar !== '/' && nextChar !== '?') {
      return false;
    }
  }
  return true;
};
