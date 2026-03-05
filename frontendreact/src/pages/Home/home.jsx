import SideBar from "../../components/sideBar";

export default function Home() {
    return (
        <div className="bg-var(--background) h-screen w-screen bg-[var(--back)]">
            <SideBar />
            <main className="flex-1 w-[80%] ml-[20%]">
                <h1>Home</h1>
            </main>
        </div>
    )
}