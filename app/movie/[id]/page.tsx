"use client";
import { useEffect, useState } from "react";
import React from "react";
import Image from "next/image";
import Script from "next/script";

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
    // const [torrents, setTorrents] = useState([] as any[]);
    const [magnet, setMagnet] = useState("");
    const [unavailable, setUnavailable] = useState(false);
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

    // useEffect(() => {
    //     const fetchTorrents = async () => {
    //         const res = await fetch(`/api/torrent`, {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //             body: JSON.stringify({ IMDB_ID: movie.imdb_id }),
    //         });
    //         const data = await res.json();
    //         setTorrents(data.body.data.movie.torrents);
    //         console.log(data); // Log the full response for debugging
    //     };

    //     fetchTorrents();
    // }, [movie.imdb_id]);

    const getTorrent = async () => {
        try {
            const res = await fetch(`/api/torrent`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ IMDB_ID: movie.imdb_id }),
            });
            // const data = await res.json();
            // const hash = data.body.data.movie.torrents[0].hash;
            // const title = movie.title.replace(/ /g, "+");
            const magnet =
                "magnet:?xt=urn:btih:08ada5a7a6183aae1e09d831df6748d566095a10&dn=Sintel";
            // const magnet = `magnet:?xt=urn:btih:${hash}&dn=${title}&tr=http://track.one:1234/announce&tr=udp://track.two:80`;
            setMagnet(magnet);
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error(error.message);
            } else {
                console.error("An unknown error occurred");
            }
        }
    };

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
            {magnet && (
                <>
                    <Script
                        src="https://cdn.jsdelivr.net/npm/@webtor/embed-sdk-js/dist/index.min.js"
                        strategy="afterInteractive"
                    />
                    <video
                        controls
                        src={
                            "magnet:?xt=urn:btih:08ada5a7a6183aae1e09d831df6748d566095a10&dn=Sintel"
                        }
                        poster={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                        width="100%"
                        data-title={movie.title}
                        className="w-1/2 h-1/2"
                    ></video>
                </>
            )}

            <button onClick={getTorrent}>Get Torrent</button>
            {/* <video
                controls
                src={
                    "magnet:?xt=urn:btih:6E88B3F25BA49D483D740A652BF013C341BC5373&dn=Interstellar&tr=http://track.one:1234/announce&tr=udp://track.two:80"
                }
                poster={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                width="100%"
                data-title="Sintel"
                className="w-1/2 h-1/2"
            ></video>
            <script
                src="https://cdn.jsdelivr.net/npm/@webtor/embed-sdk-js/dist/index.min.js"
                async
            ></script> */}
        </div>
    );
}
