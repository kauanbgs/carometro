import SideBar from "../../components/sideBar";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";


export default function GerenciarDocentes() {
    return (
        <div className="bg-[var(--background)] h-screen w-screen">
            <SideBar />
            <main className="flex-1 w-78%] ml-[22%] p-10 bg-white h-full rounded-l-3xl">
                <div className="flex gap-2">
                    <ArrowLeft />
                    <h1>Voltar</h1>
                </div>
                <div className="flex gap-20 justify-center mt-30 items-center">
                    <div>
                        <h1 className="text-lg">Adicionar Docente</h1>
                        <h2 className="text-sm mt-10">Deseja adicionar<br /> um administrador?</h2>
                        <Link to="/adicionarDocente" className="text-sm text-[var(--azulSecundario)] underline">Clique Aqui!</Link>
                    </div>
                    <hr className="border-1 border-gray-500 mt-5 h-42" />
                    <div>
                        <h1 className="text-lg">Remover Docente</h1>
                        <h2 className="text-sm mt-10">Deseja remover<br /> um administrador?</h2>
                        <Link to="/removerDocente" className="text-sm text-[var(--azulSecundario)] underline">Clique Aqui!</Link>
                    </div>
                </div>
            </main>
        </div>
    )
}