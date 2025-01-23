import Search from "@/app/components/Search";

export default function Home() {
    return (
        <div className="min-h-screen w-screen p-10">
            <div className="flex w-full items-center justify-center bg-transparent">
                <span className="absolute mx-auto py-4 flex border w-fit bg-gradient-to-r blur-xl from-blue-500 via-teal-500 to-pink-500 bg-clip-text text-6xl box-content font-extrabold text-transparent text-center select-none">
                    You Movies
                </span>
                <h1 className="relative top-0 w-fit h-auto py-4 justify-center flex bg-gradient-to-r items-center from-blue-500 via-teal-500 to-pink-500 bg-clip-text text-6xl font-extrabold text-transparent text-center select-auto">
                    You Movies
                </h1>
            </div>
            <div className="flex w-full items-center justify-center bg-transparent">
            <Search />
            </div>
        </div>
    );
}
