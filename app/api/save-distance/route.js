import sqlite3 from "sqlite3";
import { open } from "sqlite";
import { dbPath } from "../../../config/db";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { source, destination, distance_line, distance_roads } =
            await req.json();

        console.log("Received data:", {
            source,
            destination,
            distance_line,
            distance_roads,
        });

        const db = await open({
            filename: dbPath,
            driver: sqlite3.Database,
        });

        await db.exec(
            "CREATE TABLE IF NOT EXISTS distances (source TEXT, destination TEXT, distance_line REAL, distance_roads REAL)"
        );
        console.log("Table checked or created.");

        const result = await db.run(
            "INSERT INTO distances (source, destination, distance_line, distance_roads) VALUES (?, ?, ?, ?)",
            [source, destination, distance_line, distance_roads]
        );
        console.log("Insert result:", result);

        return NextResponse.json({ message: "Data saved successfully" });
    } catch (error) {
        console.error("Error saving data:", error);
        return NextResponse.json(
            { error: "Failed to save data" },
            { status: 500 }
        );
    }
}
