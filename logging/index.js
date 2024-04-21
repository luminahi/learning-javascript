import logger from "./lib/index.js";

logger.error("errors in my log!");
logger.warn("warning me about logs");
logger.info("info logging!");
logger.http("what?!");
logger.silly("do you even log?");

logger.defaultMeta = { mission: "zeta" };

logger.info("a new one");
