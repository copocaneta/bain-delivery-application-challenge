import sqlite3 from "sqlite3";
import { open } from "sqlite";
import { dbPath } from "../../../config/db";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const db = await open({
            filename: dbPath,
            driver: sqlite3.Database,
        });

        const distances = await db.all("SELECT * FROM distances");

        return NextResponse.json(distances);
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Failed to fetch data" },
            { status: 500 }
        );
    }
}
