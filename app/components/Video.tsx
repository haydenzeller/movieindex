import Script from "next/script";
import React, { useEffect, useState } from "react";

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
export default function Video({ movie }: { movie: Movie }) {
    const [magnet, setMagnet] = useState("");
    useEffect(() => {
        (async () => {
            try {
                const res = await fetch(`/api/torrent`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ IMDB_ID: movie.imdb_id }),
                });
                const data = await res.json();
                const hash = data.body.data.movie.torrents[0].hash;
                const title = movie.title.replace(/ /g, "+");
                // const magnet =
                //     "magnet:?xt=urn:btih:08ada5a7a6183aae1e09d831df6748d566095a10&dn=Sintel";
                const magnet = `magnet:?xt=urn:btih:${hash}&dn=${title}&tr=http://track.one:1234/announce&tr=udp://track.two:80`;
                setMagnet(magnet);
            } catch (error: unknown) {
                if (error instanceof Error) {
                    console.error(error.message);
                } else {
                    console.error("An unknown error occurred");
                }
            }
        })();
    }, [movie]);

    if (!magnet) {
        return <div></div>;
    }
    return (
        <div id="video">
            <video controls src={magnet}
            poster={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`} className="w-full h-auto"
            ></video>
            <Script src="https://cdn.jsdelivr.net/npm/@webtor/embed-sdk-js/dist/index.min.js" />
        </div>
    );
}
