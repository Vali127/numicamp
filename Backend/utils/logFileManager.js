import fs from "node:fs";
import path from "path";
import { fileURLToPath } from "url";

export function LogFileManager() {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const logFilePath = path.join(__dirname, "..", "admin.log");

    function init() {
        if (!fs.existsSync(logFilePath)) {
            initializeFile(logFilePath);
        }
    }

    function initializeFile(filePath) {
        const header = formatColumn("DATETIME", 30) + formatColumn("ADMIN", 20) + formatColumn("ACTION", 20) ;
        fs.writeFileSync(filePath, header + "\n", { encoding: "utf-8" });
    }

    function formatColumn(value, width) {
        return String(value).padEnd(width, " ");
    }

    function writeLog(user, message) {
        const date = "[" + formatDate() + "]";
        const line = formatColumn(date, 30) + formatColumn(user, 20) + formatColumn(message, 20);
        fs.appendFileSync(logFilePath, line + "\n");
    }

    function formatDate(date = new Date()) {
        return date.toISOString().slice(0, 19).replace("T", " ");
    }

    return {
        logFilePath,
        init,
        initializeFile,
        writeLog,
    }

}