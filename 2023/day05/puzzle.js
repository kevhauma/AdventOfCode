const isInBetween = (start, length, num) => {
  return num >= start && num < start + length;
};

const prepareData = (inputString) => {
  const chunks = inputString.split(/\r?\n\r?\n/g).filter(Boolean);
  const seeds = chunks
    .shift()
    .split(":")[1]
    .split(" ")
    .filter(Boolean)
    .map((num) => parseInt(num));

  const maps = chunks.map((chunk) => {
    return chunk.split(/\r?\n/g).reduce(
      (obj, line) => {
        if (line.includes(":")) {
          const [from, _, to] = line.split(" ")[0].split("-");
          return {
            ...obj,
            from,
            to,
          };
        } else {
          const [destinationStart, sourceStart, length] = line
            .split(" ")
            .map((num) => parseInt(num));
          obj.definitions.push({ destinationStart, sourceStart, length });
          return { ...obj };
        }
      },
      { definitions: [] }
    );
  });
  return { seeds, maps };
};

/*
Part one
*/

const p1 = (inputString, inputPath) => {
  const { seeds, maps } = prepareData(inputString, inputPath);

  let mappedSeeds = seeds;
  let from = "seed";
  do {
    const map = maps.find((map) => map.from === from);

    if (!map) break;
    const { definitions, to } = map;
    mappedSeeds = mappedSeeds.map((seed) => {
      const mapForThisSeed = definitions.find((def) =>
        isInBetween(def.sourceStart, def.length, seed)
      );

      if (!mapForThisSeed) return seed;

      const offset = seed - mapForThisSeed.sourceStart;
      return mapForThisSeed.destinationStart + offset;
    });

    from = to;
  } while (from);

  const lowestLocation = Math.min(...mappedSeeds);

  return lowestLocation;
};

/*
Part two
*/
const p2 = (inputString, inputPath) => {
  const { seeds, maps } = prepareData(inputString, inputPath);

  let seedRanges = [];

  for (let seedIndex = 0; seedIndex < seeds.length; seedIndex += 2) {
    seedRanges.push({
      start: seeds[seedIndex],
      end: seeds[seedIndex] + seeds[seedIndex + 1] - 1,
    });
  }

  let from = "seed";
  do {
    const map = maps.find((map) => map.from === from);

    if (!map) break;
    const { definitions, to } = map;

    seedRanges = seedRanges.flatMap((seedRange) => {
      const newRanges = definitions
        .flatMap((def) => {
          const defSourceEnd = def.sourceStart + def.length - 1;
          const defDestEnd = def.destinationStart + def.length - 1;

          //start of seed range is after end of definition
          //start of defintion is after end of seed range
          if (seedRange.start > defSourceEnd || seedRange.end < def.sourceStart)
            return null;
          
          //seed range fully contained in definition
          if (
            seedRange.start >= def.sourceStart &&
            seedRange.end <= defSourceEnd
          ) {
            const offset = seedRange.start - def.sourceStart;
            const start = def.destinationStart + offset;
            const end = start + (seedRange.end - seedRange.start) - 1;
            return { start, end };
          }

          const tempNewRange = []

          //seed range extends before definition
          if (
            seedRange.start < def.sourceStart &&
            seedRange.end >= def.sourceStart &&
            seedRange.end <= defSourceEnd
          ) {
            const beforePart = {
              start: seedRange.start,
              end: def.sourceStart - 1,
            };
            const inPart = {
              start: def.destinationStart,
              end: def.destinationStart + (seedRange.end - def.sourceStart) - 1,
            };
            if (def.destinationStart === 0) console.log(beforePart, inPart);
            tempNewRange.push(beforePart, inPart);
          }
          //seed range extends after definition
          if (
            seedRange.start > def.sourceStart &&
            seedRange.start < defSourceEnd &&
            seedRange.end >= defSourceEnd
          ) {
            const afterPart = { start: defSourceEnd, end: seedRange.end };
            const inPart = {
              end: defSourceEnd,
              start: defDestEnd - (defSourceEnd - seedRange.start) - 1,
            };
            //if tempNewRange is filled in by previous check, don't add the inPart (again)
            //this means that seedRange extends before and after the defintion range
            if(tempNewRange.length === 0)
              tempNewRange.push(inPart)
            tempNewRange.push(afterPart)
            
          }
          return tempNewRange
        })
        .filter(Boolean);
      
      return newRanges.length ? newRanges : seedRange;
    });

    from = to;
  } while (from);
  
  const lowestLocation = Math.min(...seedRanges.map((sae) => sae.start));

  return lowestLocation;
};

module.exports = { p1, p2 };
