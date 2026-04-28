import SideBar from "../../components/sideBar";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import items from "../../utils/itemSideBar";
import Text from "../../components/text";


export default function GerenciarDocentes() {
    return (
        <div className="bg-back h-screen w-screen">
            <SideBar items={items} />
            <main className="flex-1 w-78%] ml-[22%] p-10 bg-background h-full rounded-l-3xl">
                <div className="flex gap-2">
                    <Link className="flex gap-2 items-center" to="/home">
                        <ArrowLeft />
                        <Text variant="subtitle">Voltar</Text>
                    </Link>
                </div>
                <div className="flex gap-20 justify-center items-center mt-15 flex-wrap">
                    <div>
                        <Text variant="title" className="mb-5">Adicionar Docente</Text>
                        <Text variant="text">Deseja adicionar <br /> um administrador?</Text>
                        <Link to="/adicionarDocente" className="text-sm text-azulSecundario underline">Clique Aqui!</Link>
                    </div>
                    <div>
                        <Text variant="title" className="mb-5">Remover Docente</Text>
                        <Text variant="text">Deseja remover <br /> um administrador?</Text>
                        <Link to="/removerDocente" className="text-sm text-azulSecundario underline">Clique Aqui!</Link>
                    </div>
                </div>
            </main>
        </div>
    )
}