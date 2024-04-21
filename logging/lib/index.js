import { createLogger, config, transports, format } from "winston";
const { combine, label, timestamp, prettyPrint } = format;

function getLogger() {
    const logger = createLogger({
        level: "silly",
        format: combine(label({ label: "top" }), timestamp(), prettyPrint()),
        defaultMeta: { service: "user-service" },
        levels: config.npm.levels.error,
        transports: [
            new transports.File({
                filename: "error.log",
                level: "error",
            }),
            new transports.File({ filename: "up-to-info.log", level: "info" }),
            new transports.File({ filename: "all.log", level: "silly" }),
        ],
    });

    if (process.env.NODE_ENV !== "production") {
        logger.add(
            new transports.Console({
                format: format.simple(),
            })
        );
    }

    return logger;
}

export default getLogger();
