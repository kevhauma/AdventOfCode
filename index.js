const fs = require("fs");

const FIRST_ARG = process.argv[2];

const folders = fs
  .readdirSync("./")
  .sort()
  .filter((f) => f.includes("day"));
const folders_to_exec =
  FIRST_ARG === "all" ? folders : folders.reverse().slice(0, 1);


  const data = {
    appsettings: {      
      add: [
        {
          "@key": "as:AudienceId",
          "@value": "audience",
        },
        {
          "@key": "as:AudienceSecret",
          "@value": "mysecretgoeshere",
        },
        {
          "@key": "iss:Issuer",
          "@value": "issuer",
        },
        {
          "@key": "accessTokenExpireMinutes",
          "@value": "20",
        },
        {
          "@key": "StandardPassword",
          "@value": "aurubis123",
        },
        {
          "@key": "printSpoolFolder",
          "@value": "t:\\MarathonPrintSpool",
        },
        {
          "@key": "sharedPgrStorage",
          "@value": "",
        },
        {
          "@key": "AutoPGRQueue",
          "@value": "AutoPGRQueue",
        },
        {
          "@key": "PostMESQueue",
          "@value": "PostMESQueue",
        },
        {
          "@key": "apiKey",
          "@value": "{B254A3D1-AB4A-4614-8C0E-CA919BF89F6E}",
        },
        {
          "@key": "HARDLIMIT",
          "@value": "1000",
        },
        {
          "@key": "sharedMailQueueStorage",
          "@value": "c:\\Marathon\\sharedMailQueueStorage",
        },
        {
          "@key": "VerifyFolderIsWritable",
          "@value": "0",
        },
        {
          "@key": "UseCustomLogHandler",
          "@value": "1",
        },
        {
          "@key": "UseCustomLoggingFilter",
          "@value": "0",
        },
        {
          "@key": "UseSublotObservationsExistsForPds",
          "@value": "1",
        },
        {
          "@key": "CuPortDocumentFolder",
          "@value": "t:\\cuport",
        },
        {
          "@key": "UrlMappingFile",
          "@value":
            "D:\\DEVO\\AurubisMarathon\\MarathonSolution\\MarathonServer\\MarathonUrlMapping.json",
        },
        {
          "@key": "TempTableCollateSequence",
          "@value": "Latin1_General_CI_AS",
        },
        {
          "@key": "ObservationUri",
          "@value": "",
        },
        {
          "@key": "KioskUri",
          "@value": "http://aurubis.rekencentra.be:8065",
        },
        {
          "@key": "MarathonSignalRServer",
          "@value": "http://aurubis.rekencentra.be:8063/",
        },
      ],
    },
  };
  
  console.log((data.appsettings.add.reduce((output,entry)=>({...output, [entry["@key"]]:entry["@value"]}),{})))


const times = [["day  :"], ["part1:"], ["part2:"]];
folders_to_exec.forEach((folder) => {
  const { p1, p2 } = require(`./${folder}/puzzle.js`);
  console.log(`===== Excuting ${folder} =====`);

  const t1p1 = performance.now();
  const r1 = p1();
  console.log(`Part 1:\t ${r1}`);
  const t2p1 = performance.now();

  const t1p2 = performance.now();
  const r2 = p2();
  console.log(`Part 2:\t ${r2}`);
  const t2p2 = performance.now();

  console.log();
  times[0].push(folder + " ");
  times[1].push((t2p1 - t1p1).toFixed(3) + "ms");
  times[2].push((t2p2 - t1p2).toFixed(3) + "ms");
});

times.forEach((time) => {
  console.log(time.join("\t | "));
});
