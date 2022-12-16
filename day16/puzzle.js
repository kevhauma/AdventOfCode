const fs = require("fs");


const isSpaceOccupied = (space, walls, sand, maxY, part2) =>
  walls[`${space.x},${space.y}`] || sand[`${space.x},${space.y}`] ||
  (part2 && space.y >= maxY + 2);


const prepareData = (inputPath) => {
 const valves = fs
    .readFileSync(inputPath, { encoding: "utf8" })
    .trim()
    .split(/r?\n/g)
    .map((line) =>{
     const [valve,tunnel]=  line.split(";")
     const [namestring,flow] = valve.split("has")
     const valveName = namestring.split(" ")[1]
     const valeFlowRate = parseInt(flow.replace(/[^0-9]/g,""))
     const tunnels = tunnel.split(/valves?/)[1].split(",").map(t=>t.trim())
     return {
      name: valveName,
      flowRate: valeFlowRate,
      tunnels,
     }
    }
      )
    return valves.sort((a, b) => a.name.localeCompare(b.name));
};
const findDistance = (startValve,EndValve, data) => {
  
}
/*
Part one
*/
const p1 = (inputPath) => {
  const data = prepareData(inputPath);

  const allValves = data.map(d=>d.name)

  data.forEach(d=>{
    d.distances = allValves.map(valveToFind=>
      findDistance(d.name,valveToFind,data)
  )})

  console.log(data)
 
};

/*
Part two
*/
const p2 = (inputPath) => {
  const data = prepareData(inputPath);

  
};

module.exports = { p1, p2 };
