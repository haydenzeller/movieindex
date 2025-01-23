"use client";
import { useEffect, useState } from "react";
import React from "react";
import Image from "next/image";

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
                console.log(data);
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
    return (
        <div className="flex flex-col items-center w-full h-screen">
            <div className="">
                <div className="z-1 w-full h-80 items-center justify-center flex flex-col overflow-hidden">
                    <Image
                        src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
                        alt={movie.title + " backdrop"}
                        className=" w-full object-fill h-auto"
                        width={1920}
                        height={1080}
                        priority
                    />
                </div>
                <div className="">
                    <Image
                        src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                        alt={movie.title + " poster"}
                        width={300}
                        height={500}
                        className="rounded-lg w-[20%] h-auto absolute top-[20%] left-10"
                        priority
                    />
                </div>
            </div>
            <div className="flex flex-col items-start w-full pl-[25%]">
                <h1 className="text-3xl font-bold">{movie.title}</h1>
                <p className="text-lg">{movie.tagline}</p>
                <p className="text-lg">{movie.overview}</p>
                <p className="text-lg">{movie.budget}</p>
            </div>
        </div>
    );
}
