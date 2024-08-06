import sqlite3 from "sqlite3";
import { open } from "sqlite";
import { sql } from "@vercel/postgres";
import { dbPath } from "../../../config/db";
import { NextResponse } from "next/server";
import dotenv from "dotenv";

dotenv.config();

const saveDistanceSQLite = async (
    source,
    destination,
    distance_line,
    distance_roads
) => {
    const db = await open({
        filename: dbPath,
        driver: sqlite3.Database,
    });

    await db.run(
        "INSERT INTO distances (source, destination, distance_line, distance_roads) VALUES (?, ?, ?, ?)",
        [source, destination, distance_line, distance_roads]
    );

    return { message: "Data saved successfully" };
};

const saveDistancePostgreSQL = async (
    source,
    destination,
    distance_line,
    distance_roads
) => {
    try {
        await sql`INSERT INTO distances (source, destination, distance_line, distance_roads) VALUES (${source}, ${destination}, ${distance_line}, ${distance_roads})`;
        return { message: "Data saved successfully" };
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to insert into PostgreSQL" },
            { status: 500 }
        );
    }
};

export async function POST(req) {
    try {
        const { source, destination, distance_line, distance_roads } =
            await req.json();

        if (process.env.DATABASE === "production") {
            console.log({ source, destination, distance_line, distance_roads });
            return NextResponse.json(
                await saveDistancePostgreSQL(
                    source,
                    destination,
                    distance_line,
                    distance_roads
                )
            );
        } else {
            return NextResponse.json(
                await saveDistanceSQLite(
                    source,
                    destination,
                    distance_line,
                    distance_roads
                )
            );
        }
    } catch (error) {
        console.error("Error saving data:", error);
        return NextResponse.json(
            { error: "Failed to save data" },
            { status: 500 }
        );
    }
}
