import { sql } from "@vercel/postgres";
import dotenv from "dotenv";

dotenv.config();

const initializePostgreSQL = async () => {
    await sql`CREATE TABLE IF NOT EXISTS distances (
    source TEXT,
    destination TEXT,
    distance_line REAL,
    distance_roads REAL
  )`;
    console.log("Table created or exists already.");

    await sql`INSERT INTO distances (source, destination, distance_line, distance_roads) VALUES ('Test Source', 'Test Destination', 100.0, 200.0)`;
    console.log("Test record inserted.");

    const distances = await sql`SELECT * FROM distances`;
    console.log("Distances:", distances.rows);
};

(async () => {
    if (process.env.DATABASE === "production") {
        await initializePostgreSQL();
    } else {
        // For SQLite initialization in development
        const sqlite3 = require("sqlite3").verbose();
        const path = require("path");
        const dbPath = path.resolve("./database.sqlite");

        const db = new sqlite3.Database(dbPath);

        db.serialize(() => {
            db.run(
                "CREATE TABLE IF NOT EXISTS distances (source TEXT, destination TEXT, distance_line REAL, distance_roads REAL)"
            );
            console.log("Table created or exists already.");

            db.run(
                "INSERT INTO distances (source, destination, distance_line, distance_roads) VALUES ('Test Source', 'Test Destination', 100.0, 200.0)"
            );
            console.log("Test record inserted.");

            db.all("SELECT * FROM distances", [], (err, rows) => {
                if (err) {
                    throw err;
                }
                console.log("Distances:", rows);
            });
        });

        db.close();
    }
})();
