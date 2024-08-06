import sqlite3 from "sqlite3";
import { open } from "sqlite";
import { dbPath } from "../config/db.js";

(async () => {
    try {
        const db = await open({
            filename: dbPath,
            driver: sqlite3.Database,
        });

        await db.exec(
            "CREATE TABLE IF NOT EXISTS distances (source TEXT, destination TEXT, distance_line REAL, distance_roads REAL)"
        );
        console.log("Database initialized and table created.");
    } catch (error) {
        console.error(error);
    }
})();
