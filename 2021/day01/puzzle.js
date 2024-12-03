export const p1 = (inputString) => {
  const input = inputString.split("\n").map(Number);

  let increased = 0;

  input.reduce((prev, curr) => {
    increased += prev < curr;
    return curr;
  });
  return increased;
};
//=====================================================================
export const p2 = (inputString) => {
  const input = inputString.split("\n").map(Number);

  const windowed = input.map((depth, index) => {
    return (depth || 0) + (input[index + 1] || 0) + (input[index + 2] || 0);
  });

  increased = 0;
  windowed.reduce((prev, curr) => {
    increased += prev < curr;
    return curr;
  });
  return increased;
};
