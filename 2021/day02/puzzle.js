export const p1 = (inputString) => {
  const input = inputString.split("\n").map((line) => {
    const [direction, value] = line.split(" ");
    return { direction, distance: parseInt(value) };
  });

  let position = { x: 0, y: 0 };
  input.forEach((move) => {
    switch (move.direction) {
      case "forward":
        position.x += move.distance;
        break;
      case "up":
        position.y -= move.distance;
        break;
      case "down":
        position.y += move.distance;
        break;
    }
  });
  return position.x * position.y;
};

//=================================================================================

export const p2 = (inputString) => {
  const input = inputString.split("\n").map((line) => {
    const [direction, value] = line.split(" ");
    return { direction, distance: parseInt(value) };
  });

  position = { x: 0, y: 0, aim: 0 };
  input.forEach((move) => {
    switch (move.direction) {
      case "forward":
        position.x += move.distance;
        position.y += position.aim * move.distance;
        break;
      case "up":
        position.aim -= move.distance;
        break;
      case "down":
        position.aim += move.distance;
        break;
    }
  });
  return position.x * position.y;
};
