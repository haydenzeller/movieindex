import Search from "@/app/components/Search";

export default function Home() {
    return (
        <div className="min-h-screen w-screen p-10">
            <div id="container-8c8c367dc3d732df912835592add853e"></div>
            <div className="flex w-full items-center justify-center bg-transparent">
                <span className="absolute mx-auto py-4 flex border w-fit bg-gradient-to-r blur-xl from-blue-500 via-teal-500 to-pink-500 bg-clip-text text-6xl box-content font-extrabold text-transparent text-center select-none">
                    Open Cinemas
                </span>
                <h1 className="relative top-0 w-fit h-auto py-4 justify-center flex bg-gradient-to-r items-center from-blue-500 via-teal-500 to-pink-500 bg-clip-text text-6xl font-extrabold text-transparent text-center select-auto">
                    Open Cinemas
                </h1>
            </div>
            <div className="flex w-full items-center justify-center bg-transparent">
                <Search />
            </div>

            <script
                async
                data-cfasync="false"
                src="//pl25700289.profitablecpmrate.com/8c8c367dc3d732df912835592add853e/invoke.js"
            ></script>
            <div id="container-8c8c367dc3d732df912835592add853e"></div>
        </div>
    );
}
