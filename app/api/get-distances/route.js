import sqlite3 from "sqlite3";
import { open } from "sqlite";
import { sql } from "@vercel/postgres";
import { dbPath } from "../../../config/db";
import { NextResponse } from "next/server";
import dotenv from "dotenv";

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
    const { rows } = await sql`SELECT * FROM distances`;
    return rows;
};

export async function GET() {
    try {
        console.log("process.env", process.env);
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
