import pg from "pg";
import dotenv from "dotenv";
import sqlite3 from "sqlite3";
import { open } from "sqlite";
import { dbPath } from "../config/db.js";

dotenv.config();

const { Pool } = pg;

const pool = new Pool({
    connectionString: process.env.POSTGRES_URL,
});

const initializePostgreSQL = async () => {
    const client = await pool.connect();
    try {
        await client.query(`
        CREATE TABLE IF NOT EXISTS distances (
          source TEXT,
          destination TEXT,
          distance_line REAL,
          distance_roads REAL
        )
      `);
        console.log("Table created or exists already.");

        await client.query(`
        INSERT INTO distances (source, destination, distance_line, distance_roads) 
        VALUES ('Test Source', 'Test Destination', 100.0, 200.0)
      `);
        console.log("Test record inserted.");

        const res = await client.query("SELECT * FROM distances");
        console.log("Distances:", res.rows);
    } finally {
        client.release();
    }
};

if (process.env.DATABASE === "production") {
    await initializePostgreSQL();
} else {
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
}
