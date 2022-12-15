const fs = require("fs");

const visualize = (coveredSpots, beacons, sensors, min, max) => {
  for (let y = min.y; y <= max.y; y++) {
    let line = y + ":\t ";
    for (let x = min.x; x <= max.x; x++) {
      if (sensors.find((s) => s.x === x && s.y === y)) line += "S";
      else if (beacons.find((b) => b.x === x && b.y === y)) line += "B";
      else if (coveredSpots[`${x},${y}`]) line += "#";
      else line += ".";
    }
    console.log(line);
  }
};

const getDistance = (p1, p2) => Math.abs(p1.x - p2.x) + Math.abs(p1.y - p2.y);

const prepareData = (inputPath) => {
  return fs
    .readFileSync(inputPath, { encoding: "utf8" })
    .trim()
    .split(/r?\n/g)
    .map((line) => {
      const [sensor, beacon] = line.split(":").map((sensorOrBeacon) => {
        const [x, y] = sensorOrBeacon
          .split(",")
          .map((part) => parseInt(part.replace(/[^0-9]/g, "")));
        return { x, y };
      });
      return { sensor, beacon, distance: getDistance(sensor,beacon) };
    });
};

/*
Part one
*/
const p1 = (inputPath) => {
  const LINE_TO_CHECK = inputPath.includes("test") ? 10 : 2000000;

  const data = prepareData(inputPath);
  const coveredSpots = {};
  data.forEach(({ sensor, beacon, distance }) => {
    if (
      !(
        sensor.y + distance > LINE_TO_CHECK &&
        sensor.y - distance < LINE_TO_CHECK
      )
    )
      return;

    const distanceToLine = getDistance(sensor, {
      x: sensor.x,
      y: LINE_TO_CHECK,
    });
    const overshoot = Math.abs(distance - distanceToLine);

    for (let x = sensor.x - overshoot; x <= sensor.x + overshoot; x++) {
      if (
        !data.find(
          ({ beacon: b, sensor: s }) =>
            (b.x === x && b.y === LINE_TO_CHECK) ||
            (s.x === x && s.y === LINE_TO_CHECK)
        )
      )
        coveredSpots[`${x},${LINE_TO_CHECK}`] = true;
    }
  });
//visualize(coveredSpots,data.map(d=>d.beacon),data.map(d=>d.sensor),{x:0,y:20},{x:20,y:20})
  return Object.keys(coveredSpots)
    .filter((key) => coveredSpots[key])
    .filter((spot) => parseInt(spot.split(",")[1]) === LINE_TO_CHECK).length;
};

/*
Part two
*/
const p2 = (inputPath) => {
  const data = prepareData(inputPath);
    let distress = null
  for (const {sensor,beacon,distance} of data) {   
    const p1 = performance.now() 

    distanceToCheck = distance + 1; //only search 1 out fron the boundary

    const spotsToSearch = [];

    for (let y = 0; y <= distance; y++) {
      const x = distance - y;
      spotsToSearch.push({ x: sensor.x, y: sensor.y + y });
      if (y) spotsToSearch.push({ x: sensor.x, y: sensor.y - y });
      spotsToSearch.push({ x: sensor.x - x, y: sensor.y });
      if (x) spotsToSearch.push({ x: sensor.x - x, y: sensor.y });      
    }
    spotsToSearch.forEach(spot=>{
        const closestSensorBeacon = data.reduce((closest,{sensor,beacon,distance})=>{
            const spotDistance = getDistance(spot,sensor)
            return spotDistance < closest.spotDistance ? {sensor,beacon,distance,spotDistance} : closest
        },{spotDistance:Infinity})
       // console.log(closestSensorBeacon)
        if(closestSensorBeacon.spotDistance > closestSensorBeacon.distance)
        distress = {...closestSensorBeacon,spot}
    })
    const p2 = performance.now(); 
    console.log("took:",p2-p1,"ms")
    if(distress) break;
  };
  console.log(distress)
  return BigInt(distress.spot.x) * 4000000n + BigInt(distress.spot.y);
};

module.exports = { p1, p2 };
