import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const {IMDB_ID} = await request.json();
    const ENDPOINT = ` https://yts.mx/api/v2/movie_details.json?imdb_id=${IMDB_ID}`;

    try {
        const response = await fetch(ENDPOINT, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await response.json();
         console.log(data);
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