import { Search } from "lucide-react";
import Separator from "../../components/separator";
import SideBar from "../../components/sideBar";
import items from "../../utils/itemSideBar";
import Text from "../../components/text";
import List from "../../components/list";
import Input from "../../components/input";
import Button from "../../components/button";
import { useState, useEffect } from "react";
import api from "../../axios/axios";

export default function EditarTurma() {
    const [classes, setClasses] = useState([]);

    useEffect(() => {
        api.getTurmas().then((response) => {
            // Garante que pega o array de turmas independente do formato da resposta
            const data = response.data.classs || response.data;
            setClasses(Array.isArray(data) ? data : []);
        }).catch(() => setClasses([]));
    }, []);

    return (
        <div className="h-screen w-screen bg-[var(--back)] flex">
            <SideBar items={items} />
            <main className="flex-1 ml-[22%] p-10 overflow-y-auto bg-[var(--background)] rounded-l-3xl">
                <Text variant="title">Gerenciar Turmas</Text>
                
                <div className="flex flex-row justify-start gap-5 items-center mt-5">
                    <Input placeholder="Digite o nome da turma" />
                    <Input placeholder="Professor"/>
                    <button className="flex items-center gap-2 bg-gray-800 px-5 py-2.5 rounded-lg cursor-pointer">
                        <Search className="text-white w-5 h-5"/>
                    </button>
                    <Separator horizontal={false} />
                    <Button color="preto" rounded="lg" text="Criar Turma" />
                </div>

                <List classes={classes} />
            </main>
        </div>
    );
}