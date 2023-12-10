/*
 | => NS    ║
 - => EW    ═
 L => NE    ╚ 
 J => NW    ╝
 7 => SW    ╗
 F => SE    ╔ 
 . =>  no pipe
 S => start
*/

const D = {
  N: "N",
  E: "E",
  S: "S",
  W: "W",
};

const vizualise = (pipes) => {
  console.log("=======================")
  pipes.forEach((line)=>{
    let logLine = ""
    line.forEach(pipe=>{
      if(pipe.entered)
      logLine+="#"
      else
      logLine+=pipe.letter
    })
    console.log(logLine)
  })
}

const getReverseDirection = ( direction) => {
  switch (direction) {
    case D.N:
      return D.S
    case D.E:
      return D.W;
    case D.S:
      return D.N;
    case D.W:
      return D.E;
  }
};
const getNeighbour = (pipes, line, direction) => {
  switch (direction) {
    case D.N:
      return pipes[line.y - 1][line.x];
    case D.E:
      return pipes[line.y][line.x + 1];
    case D.S:
      return pipes[line.y + 1][line.x];
    case D.W:
      return pipes[line.y][line.x - 1];
  }
};

const getAllNeighbour = (pipes, line) => {
  return [
    getNeighbour(pipes, line, D.N),
    getNeighbour(pipes, line, D.E),
    getNeighbour(pipes, line, D.S),
    getNeighbour(pipes, line, D.W),
  ];
};

const getEnteredPipe=(pipe,direction) =>{
  if(!pipe) return pipe
  pipe.entered = direction
  return pipe
}

const getStartNeighbours = (pipes, start) => {
  const [northPipe, eastPipe, southPipe, westPipe] = getAllNeighbour(
    pipes,
    start
  );

  let neighbours = [];
  if (northPipe && `${northPipe.from}${northPipe.to}`.includes(D.S))
    neighbours.push(getEnteredPipe(northPipe,D.S ));
  if (eastPipe && `${eastPipe.from}${eastPipe.to}`.includes(D.W))
    neighbours.push(getEnteredPipe(eastPipe, D.W ));
  if (southPipe && `${southPipe.from}${southPipe.to}`.includes(D.N))
    neighbours.push(getEnteredPipe(southPipe, D.N ));
  if (westPipe && `${westPipe.from}${westPipe.to}`.includes(D.E))
    neighbours.push(getEnteredPipe(westPipe, D.E ));

  return neighbours;
};

const getPipeConfig = (letter) => {
  switch (letter) {
    case "|":
      return { from: D.N, to: D.S };
    case "-":
      return { from: D.E, to: D.W };
    case "L":
      return { from: D.N, to: D.E };
    case "J":
      return { from: D.N, to: D.W };
    case "7":
      return { from: D.S, to: D.W };
    case "F":
      return { from: D.S, to: D.E };
    default:
      return null;
  }
};

const prepareData = (inputString) => {
  let start;
  const pipes = inputString
    .split(/\r?\n/g)
    .filter(Boolean)
    .map((line, y) =>
      line.split("").map((letter, x) => {
        if (letter === "S") start = { x, y, entered:true };
        return {
          letter,
          x,
          y,
          ...getPipeConfig(letter),
        };
      })
    );

  return { pipes, start };
};

/*
Part one
*/

const p1 = (inputString, inputPath) => {
  
  const { pipes, start } = prepareData(inputString, inputPath);
  const lines = getStartNeighbours(pipes, start);

  let line1 = lines[0]
  let line2 = lines[1]

  let distance = 1;

  do {
    const nextDirection1 = line1.entered === line1.from ? line1.to : line1.from;
    const nextDirection2 = line2.entered === line2.from ? line2.to : line2.from;
    
    const neighbour1 = getNeighbour(pipes,line1,nextDirection1)
    const neighbour2 = getNeighbour(pipes,line2,nextDirection2)

    line1 = getEnteredPipe(neighbour1,getReverseDirection(nextDirection1))
    line2 = getEnteredPipe(neighbour2,getReverseDirection(nextDirection2))
    
   // vizualise(pipes)

    distance += 1
  } while (line1.x !== line2.x || line1.y !== line2.y);
  return (distance)
};

/*
Part two
*/
const p2 = (inputString, inputPath) => {
  const data = prepareData(inputString, inputPath);
};

module.exports = { p1, p2 };
