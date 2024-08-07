import sqlite3 from "sqlite3";
import { open } from "sqlite";
// import { sql } from "@vercel/postgres";
import { dbPath } from "../../../config/db";
import { NextResponse } from "next/server";
import dotenv from "dotenv";
import pg from "pg";

const { Pool } = pg;

const pool = new Pool({
    connectionString: process.env.POSTGRES_URL,
});

dotenv.config();

const getDistancesSQLite = async () => {
    const db = await open({
        filename: dbPath,
        driver: sqlite3.Database,
    });

    const distances = await db.all("SELECT * FROM distances");

    return distances;
};

const getDistancesPostgreSQL = async () => {
    // @vercel/postgres:

    // const { rows } = await sql`SELECT * FROM distances LIMIT 110`;
    // console.log(rows.length);
    // console.log({ rows });
    // return rows;

    const client = await pool.connect();
    try {
        const res = await client.query("SELECT * FROM distances");
        console.log("Fetched from PostgreSQL:", res.rows.length);
        return res.rows;
    } finally {
        client.release();
    }
};

export async function GET() {
    console.log(`I am on ${process.env.DATABASE} database`);
    try {
        if (process.env.DATABASE === "production") {
            return NextResponse.json(await getDistancesPostgreSQL());
        } else {
            return NextResponse.json(await getDistancesSQLite());
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        return NextResponse.json(
            { error: "Failed to fetch data" },
            { status: 500 }
        );
    }
}
