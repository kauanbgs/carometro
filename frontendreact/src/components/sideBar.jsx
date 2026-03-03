import { House } from 'lucide-react';


export default function SideBar() {
    return (
        <div className="w-52 bg-white border-r border-gray-200 flex flex-col h-screen fixed left-0 top-0 rounded-3xl">
            <header className="flex items-center justify-center p-4">
                <img src="/SenaiLogo.png" alt="" className="w-48 " />
            </header>
            <main className="flex flex-col gap-2 mt-12 p-4">
                <div className="flex items-center gap-2">
                    <House />
                    <h1 className="text-sm">Inicio</h1>
                </div>
                <hr className="border-t-1 border-gray-800 mt-5 w-[85%] self-center" />
                <h1 className="text-sm self-center text-blue-400 font-semibold mt-3">ALUNOS</h1>
                <div className="flex items-center gap-2">
                    <House />
                    <h1 className="text-sm">Gerenciar Turmas</h1>
                </div>
                <hr className="border-t-1 border-gray-800 mt-5 w-[85%] self-center" />
                <h1 className="text-sm self-center text-blue-400 font-semibold mt-3">DOCENTES</h1>
                <div className="flex items-center gap-2">
                    <House />
                    <h1 className="text-sm">Gerenciar Docentes</h1>
                </div>
            </main>
        </div>
    )
}