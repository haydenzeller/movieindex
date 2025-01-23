import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { query } = await req.json();
    const ENDPOINT = `https://api.themoviedb.org/3/movie/${query}`;
    const API_KEY = process.env.TMDB_TOKEN;
    try {
        const res = await fetch(ENDPOINT, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${API_KEY}`,
            },
        });
        const data = await res.json();
        return NextResponse.json({ body: data });
    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        } else {
            return NextResponse.json(
                { error: "An unknown error occurred" },
                { status: 500 }
            );
        }
    }
}
