function convertData(data) {
  const regex = /\w{3}:[\w|\d|#]{1,15};/g;
  let entries = [];
  let lines = data.split("\n");

  let tempEntry = "";
  // go trough each line, add lines to entry until empty line,
  // empty line means new entry
  for (let i = 0; i < lines.length; i++) {
    let line = lines[i].trim();
    if (line === "") {
      entries.push(tempEntry.trim().replace(/\s/g, ";") + ";");
      tempEntry = "";
    } else {
      tempEntry += line + " ";
    }
  }

  //translate line entry to object, Regex match gets all fields
  entries = entries.map((e) => {
    let newEntry = {};
    e.match(regex).forEach((match) => {
      let [key, value] = match.replace(";", "").split(":");
      newEntry[key] = value;
    });
    return newEntry;
  });

  return entries;
}

function numberValidator(entry, lenght, start, end) {
  if (!entry) return false;
  if (entry.length != lenght) return false;
  let byrNumber = parseInt(entry);
  if (entry < start) return false;
  if (entry > end) return false;

  return true;
}

function byrValidator(byr) {
  return numberValidator(byr, 4, 1920, 2002);
}

function iyrValidator(iyr) {
  return numberValidator(iyr, 4, 2010, 2020);
}

function eyrValidator(eyr) {
  return numberValidator(eyr, 4, 2020, 2030);
}

function hgtValidator(hgt) {
  if (!hgt) return false;
  let measurement = hgt.match(/\w{2}$/)[0];
  let value = hgt.match(/^\d+/)[0];

  if (measurement === "cm") return numberValidator(value, 3, 150, 193);
  else return numberValidator(value, 2, 59, 76);
}

function hclValidator(hcl) {
  if (!hcl) return false;
  return hcl.match(/#(\d|[a-f]){6}/) != null;
}

function eclValidator(ecl) {
  const validEyeColors = ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"];
  return validEyeColors.includes(ecl);
}

function pidValidator(pid) {
  return numberValidator(pid, 9, 0, 999999999);
}

const validators = {
  byr: byrValidator,
  iyr: iyrValidator,
  eyr: eyrValidator,
  hgt: hgtValidator,
  hcl: hclValidator,
  ecl: eclValidator,
  pid: pidValidator,
};

const neededKeys = Object.keys(validators).sort(); // "cid" not needed

// PART ONE
// ============================================================================================
export const p1 = (inputString) => {
  let entries = convertData(inputString);

  let validEntries = 0;

  entries.forEach((entry) => {
    if (partOneValidator(entry)) validEntries++;
  });

  return validEntries;
};

function partOneValidator(entry) {
  let keys = Object.keys(entry).sort();
  let valid = true;
  neededKeys.forEach((key) => {
    if (!keys.includes(key)) {
      valid = false;
    }
  });
  return valid;
}

// PART TWO
// ============================================================================================
export const p2 = (inputString) => {
  let entries = convertData(inputString);

  let validEntries = 0;

  entries.forEach((entry) => {
    if (partTwoValidator(entry)) validEntries++;
  });

  return validEntries;
};

function partTwoValidator(entry) {
  let valid = true;
  neededKeys.forEach((key) => {
    let result = validators[key](entry[key]);
    if (!result) valid = false;
  });
  return valid;
}
