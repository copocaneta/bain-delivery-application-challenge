import sqlite3 from "sqlite3";
import { open } from "sqlite";
import path from "path";

const dbPath = path.resolve("./database.sqlite");

(async () => {
    try {
        const db = await open({
            filename: dbPath,
            driver: sqlite3.Database,
        });

        console.log("Database file path:", dbPath);
        console.log("Database opened successfully");

        // Initialize the table
        await db.exec(
            "CREATE TABLE IF NOT EXISTS distances (source TEXT, destination TEXT, distance_line REAL, distance_roads REAL)"
        );
        console.log("Table created or exists already.");

        // Insert a test record
        await db.run(
            "INSERT INTO distances (source, destination, distance_line, distance_roads) VALUES (?, ?, ?, ?)",
            ["Test Source", "Test Destination", 100.0, 150.0]
        );

        // Query the table
        const distances = await db.all("SELECT * FROM distances");
        console.log("Distances:", distances);
    } catch (error) {
        console.error(error);
    }
})();
