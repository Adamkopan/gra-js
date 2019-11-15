export const random = (minimal, maximal) => {
  let min = parseInt(minimal, 10);
  let max = parseInt(maximal, 10);

  if (min > max) {
    let tmp = min;
    min = max;
    max = tmp;
  }

  return Math.floor(Math.random() * (max - min + 1) + min);
}
