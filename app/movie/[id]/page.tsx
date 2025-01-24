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
    // const url = "magnet:?xt=urn:btih:dd8255ecdc7ca55fb0bbf81323d87062db1f6d1c&dn=Big+Buck+Bunny&tr=udp%3A%2F%2Fexplodie.org%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.empire-js.us%3A1337&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.fastcast.nz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com&ws=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2F&xs=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2Fbig-buck-bunny.torrent"
    if (!movie.id) {
        return <div></div>;
    }
    return (
        <div className="flex flex-col items-center w-full h-screen">
            <div className="">
                <div className="z-1 w-full h-80 items-center justify-center flex flex-col overflow-hidden">
                    <Image
                        src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
                        alt={movie.title + " backdrop"}
                        className=" w-full object-fill h-auto blur z-1"
                        width={1920}
                        height={1080}
                        priority
                    />
                </div>
                {/* <div className="">
                    <Image
                        src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                        alt={movie.title + " poster"}
                        width={300}
                        height={500}
                        className="rounded-lg w-[20%] h-auto  top-[20%] left-10"
                        priority
                    />
                </div> */}
            </div>
            <div className="flex flex-row items-start w-full gap-2 p-10">
                <Image
                    src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                    alt={movie.title + " poster"}
                    width={300}
                    height={500}
                    className="rounded-lg z-10 w-auto h-auto mt-[-200]"
                    priority
                />
                <div className="flex p-6 flex-col items-start w-full">
                    <h1 className="text-4xl font-bold">{movie.title}</h1>
                    <p className="text-3xl font-bold">{movie.tagline}</p>
                    <br />
                    <p className="text-2xl">{movie.overview}</p>
                </div>
            </div>
        </div>
    );
}
