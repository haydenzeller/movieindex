import { Button } from "@heroui/react";
import React, { useEffect, useState } from "react";

// type Movie = {
//     id: string;
//     title: string;
//     poster_path: string;
//     backdrop_path: string;
//     overview: string;
//     budget: number;
//     tagline: string;
//     genres: { id: number; name: string }[];
//     imdb_id: string;
// };

export default function Video({ movie }) {
    const [magnet, setMagnet] = useState("");
    const [torrents, setTorrents] = useState([]);

    // Fetch torrents
    useEffect(() => {
        const fetchTorrents = async () => {
            try {
                const res = await fetch(`/api/torrent`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ IMDB_ID: movie.imdb_id }),
                });
                const data = await res.json();
                setTorrents(data.body.data.movie.torrents);
            } catch (error) {
                console.error("An error occurred:", error);
            }
        };
        fetchTorrents();
    }, [movie]);

    // Function to load the selected magnet link
    const loadMagnet = (hash) => {
        const title = movie.title.replace(/ /g, "+");
        const newMagnet = `magnet:?xt=urn:btih:${hash}&dn=${title}&tr=http://track.one:1234/announce&tr=udp://track.two:80`;
        setMagnet(newMagnet);
    };

    // Dynamically load Webtor script and initialize player when magnet changes
    useEffect(() => {
        // Cleanup previous script if exists
        const previousScript = document.querySelector(
            "script[src='https://cdn.jsdelivr.net/npm/@webtor/embed-sdk-js/dist/index.min.js']"
        );
        if (previousScript) {
            document.body.removeChild(previousScript);
        }

        const script = document.createElement("script");
        script.src =
            "https://cdn.jsdelivr.net/npm/@webtor/embed-sdk-js/dist/index.min.js";
        script.async = true;
        script.onload = () => {
            // Initialize the player after the script is loaded
            if (window.webtor) {
                // clear previous player if exists
                if (document.getElementById("player")) {
                    document.getElementById("player").innerHTML = "";
                }
                window.webtor.push({
                    id: "player",
                    magnet: magnet,
                    poster: `https://image.tmdb.org/t/p/original/${movie.backdrop_path}`,
                    lang: "en",
                });
            }
        };
        document.body.appendChild(script);

        // Cleanup the script when component unmounts
        return () => {
            document.body.removeChild(script);
        };
    }, [magnet, movie.backdrop_path]); // Trigger on magnet change

    return (
        <>
            <div className="flex flex-col items-center justify-center mb-5 lg:justify-start lg:flex-row gap-10 w-full h-auto mt-5">
                {torrents.map((torrent) => (
                    <Button
                        key={torrent.hash}
                        onPress={() => {
                            loadMagnet(torrent.hash);
                        }}
                    >
                        {torrent.quality}
                    </Button>
                ))}
            </div>

            {/* Webtor player container */}
            <div
                id="player"
                className={`${magnet ? "border-3" : ""} rounded-lg`}
            ></div>
        </>
    );
}
