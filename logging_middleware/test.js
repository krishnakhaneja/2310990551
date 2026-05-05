const Log = require("./logger");

async function run() {
  const res = await Log("backend","info","handler","Logger working test");
  console.log(res);
}

run();
