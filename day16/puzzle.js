const fs = require("fs");

const prepareData = (inputPath) => {
  const valves = fs
    .readFileSync(inputPath, { encoding: "utf8" })
    .trim()
    .split(/r?\n/g)
    .map((line) => {
      const [valve, tunnel] = line.split(";");
      const [namestring, flow] = valve.split("has");
      const valveName = namestring.split(" ")[1];
      const valeFlowRate = parseInt(flow.replace(/[^0-9]/g, ""));
      const tunnels = tunnel
        .split(/valves?/)[1]
        .split(",")
        .map((t) => t.trim());
      return {
        name: valveName,
        flowRate: valeFlowRate,
        open: false,
        tunnels,
        distances: [],
      };
    });
  return valves.sort((a, b) => a.name.localeCompare(b.name));
};

const findDistance = (
  startValve,
  endValve,
  currentDistance,
  data,
  distances
) => {
  const con1Name = `${startValve},${endValve}`;
  const con2Name = `${endValve},${startValve}`;
  if (startValve === endValve) return currentDistance;
  if (currentDistance > data.length) return currentDistance;

  if (!distances[con1Name] && !distances[con2Name]) {
    const startValveData = data.find((d) => d.name === startValve);
    const distancesToTunnels = startValveData.tunnels.map((nextValve) => {
      return findDistance(
        nextValve,
        endValve,
        currentDistance + 1,
        data,
        distances
      );
    });
    return Math.min(...distancesToTunnels);
  } else {
    return (distances[con1Name] || distances[con2Name]) + 1;
  }
};
/*
Part one
*/
const p1 = (inputPath) => {
  const data = prepareData(inputPath);

  let minutesLeft = 30;

  const allValves = data.map((d) => d.name);
  const distances = {};
  data.forEach((d) => {
    allValves.forEach((valveToFind) => {
      const distance = findDistance(d.name, valveToFind, 0, data, distances);
      distances[`${d.name},${valveToFind}`] = distance;
      if (valveToFind !== d.name)
        d.distances.push({ end: valveToFind, distance });
    });
  });
  let score = 0;
  let currentValve = "AA";

  while (minutesLeft >= 0) {
    const currentValvaData = data.find((d) => d.name === currentValve);
    const valvesToCheck = data.filter(
      (d) => !d.open && d.name !== currentValve
    );
    let maxScoreForThisRound = { score: 0, valve: null, distance: 0 };
    valvesToCheck.forEach((valveToCheck) => {
      const distanceToValve = currentValvaData.distances.find(
        ({ end }) => valveToCheck.name === end
      );
      const possibleScore =
        (minutesLeft - (distanceToValve.distance+1)) * valveToCheck.flowRate;
      console.log(
        valveToCheck.name,
        possibleScore,
        minutesLeft,
        distanceToValve.distance,
        valveToCheck.flowRate
      );
      if (possibleScore > maxScoreForThisRound.score) {
        maxScoreForThisRound = {
          score: possibleScore,
          valve: valveToCheck,
          distance: distanceToValve,
        };
      }
    });
    console.log(maxScoreForThisRound);
    minutesLeft -= 29;
  }
};

/*
Part two
*/
const p2 = (inputPath) => {
  const data = prepareData(inputPath);
};

module.exports = { p1, p2 };
