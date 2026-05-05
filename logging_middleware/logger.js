require("dotenv").config();
const axios = require("axios");

const allowedStacks = ["backend", "frontend"];
const allowedLevels = ["debug", "info", "warn", "error", "fatal"];

const backendPackages = [
  "cache","controller","cron job","db","domain",
  "handler","repository","route","service"
];

const frontendPackages = ["component","hook","state","style"];
const commonPackages = ["auth","config","middleware","utils"];

async function Log(stack, level, pkg, message) {
  try {
    // validation
    if (!allowedStacks.includes(stack)) throw "Invalid stack";
    if (!allowedLevels.includes(level)) throw "Invalid level";

    const validPackages = [...backendPackages, ...frontendPackages, ...commonPackages];
    if (!validPackages.includes(pkg)) throw "Invalid package";

    const response = await axios.post(
      process.env.LOG_API,
      {
        stack: stack,
        level: level,
        package: pkg,
        message: message,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (err) {
    console.error("Logging failed:", err.message);
  }
}

module.exports = Log;
