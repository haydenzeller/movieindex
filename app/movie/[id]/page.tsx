"use client";
import { useEffect, useState } from "react";
import React from "react";
import Image from "next/image";
import Video from "@/app/components/Video";


export default function Movie({ params }: { params: Promise<{ id: string }> }) {
    type Movie = {
        id: string;
        title: string;
        poster_path: string;
        backdrop_path: string;
        overview: string;
        budget: number;
        tagline: string;
        genres: { id: number; name: string }[];
        imdb_id: string;
    };
    const { id } = React.use(params);
    const [movie, setMovie] = useState({} as Movie);
    useEffect(() => {
        (async () => {
            try {
                const res = await fetch(`/api/movie`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ query: id }),
                });
                const data = await res.json();
                setMovie(data.body);
            } catch (error: unknown) {
                if (error instanceof Error) {
                    console.error(error.message);
                } else {
                    console.error("An unknown error occurred");
                }
            }
        })();
    }, [id]);
    if (!movie) {
        return <div>Loading...</div>;
    }
    return (
        <div className="relative min-w-screen min-h-screen">
            <div
                className="absolute inset-0"
                style={{
                    backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundAttachment: "fixed",
                    filter: "blur(8px)",
                }}
            />
            <div
                className="absolute inset-0"
                style={{
                    background:
                        "linear-gradient(to bottom, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.95))",
                }}
            />
            <div className="relative flex flex-col items-center w-full min-h-screen md:p-5 z-10">
                <div className="flex lg:flex-row flex-col items-center lg:items-start w-full p-3">
                    <Image
                        src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                        alt={movie.title + " poster"}
                        width={300}
                        height={500}
                        className="rounded-lg z-10 w-auto h-auto md:mx-5"
                        priority
                    />
                    <div className="flex flex-col items-center lg:items-start h-auto w-full">
                        <div className="bg-black bg-opacity-60 p-5 rounded-lg">
                            <h1 className="text-4xl font-bold">
                                {movie.title}
                            </h1>
                            <p className="text-3xl font-bold italic">
                                {movie.tagline}
                            </p>

                            <br />
                            <p className="text-2xl">{movie.overview}</p>
                        </div>
                        <div className="w-full lg:w-1/2 md:w-3/4">
                            <Video movie={movie} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
