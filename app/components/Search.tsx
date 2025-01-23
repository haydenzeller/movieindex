"use client";
import { Button, Input, Progress } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
export default function Search() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const handleSearch = async () => {
        try {
            setLoading(true);
            const res = await fetch(`/api/search`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ query }),
            });
            const data = await res.json();
            console.log(data);
            setResults(data.body.results);
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error(error.message);
            } else {
                console.error("An unknown error occurred");
            }
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="flex flex-col items-center w-full">
            <div className="mt-6 flex sm:w-full md:w-1/2 lg:w-1/4 justify-center items-center gap-3 flex-col font-bold">
                <Input
                    label="Search"
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            handleSearch();
                        }
                    }}
                />
                <Button className="w-1/4" onPress={handleSearch}>
                    Submit
                </Button>
            </div>
            {loading && <Progress isIndeterminate className="w-1/4 h-1 mt-10"/>}
            <div className="grid grid-cols-2 lg:gap-10 lg:grid-cols-5 xl:grid-cols-8 md:grid-cols-3 sm:grid-cols-2 w-full sm:px-24 my-10 gap-20">
                {results.map(
                    (result: {
                        title: string;
                        id: number;
                        poster_path: string;
                    }) => (
                        <Link key={result.id} href={`/movie/${result.id}`}>
                            <div className="flex flex-col items-center">
                                <Image
                                    src={`https://image.tmdb.org/t/p/original/${result.poster_path}`}
                                    width={300}
                                    height={500}
                                    alt={result.title}
                                    className="rounded-lg"
                                />
                                <p className="text-center font-bold">
                                    {result.title}
                                </p>
                            </div>
                        </Link>
                    )
                )}
            </div>
        </div>
    );
}
