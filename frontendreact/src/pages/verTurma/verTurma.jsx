import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Search } from "lucide-react";
import Separator from "../../components/separator";
import SideBar from "../../components/sideBar";
import items from "../../utils/itemSideBar";
import Text from "../../components/text";
import StudentList from "../../components/studentList";
import Input from "../../components/input";
import Button from "../../components/button";
import Modal from "../../components/modal";
import api from "../../axios/axios";

export default function VerTurma() {
    const { id_class } = useParams();
    const [students, setStudents] = useState([]);
    const [nomeDoAluno, setNomeDoAluno] = useState("");
    const [numeroDoAluno, setNumeroDoAluno] = useState("");

    useEffect(() => {
        api.getAlunosByTurma(id_class).then((response) => {
            const data = response.data;
            console.log(data);
            setStudents(data.students || []);
        }).catch(() => setStudents([]));
    }, [id_class]);

    const handleSearch = () => {
        if(nomeDoAluno === "" && numeroDoAluno === "") {
            api.getAlunosByTurma(id_class).then((response) => {
                const data = response.data.students;
                console.log(data);
                setStudents(data || []);
            }).catch(() => setStudents([]));
        }
        if(nomeDoAluno !== "" && numeroDoAluno === "") {
            api.getAlunosByName(nomeDoAluno).then((response) => {
                const data = response.data.students;
                console.log(data);
                setStudents(data || []);
            }).catch(() => setStudents([]));
        }
        if(nomeDoAluno === "" && numeroDoAluno !== "") {
            api.getAlunosByNumber(numeroDoAluno).then((response) => {
                const data = response.data.students;
                console.log(data);
                setStudents(data || []);
            }).catch(() => setStudents([]));
        }
    };

    return (
        <div className="h-screen w-screen bg-[var(--back)] flex">
            <SideBar items={items} />
            <main className="flex-1 ml-[22%] p-10 overflow-y-auto bg-[var(--background)] rounded-l-3xl">
                <Text variant="title">Gerenciar Turmas</Text>
                
                <div className="flex flex-wrap justify-start gap-5 items-center mt-5">
                    <Input placeholder="Nome do aluno" onChange={(e) => setNomeDoAluno(e.target.value)}/>
                    <Input placeholder="Número do aluno" onChange={(e) => setNumeroDoAluno(e.target.value)}/>
                    <button className="flex items-center gap-2 bg-gray-800 px-5 py-2.5 rounded-lg cursor-pointer hover:bg-gray-700 transition-colors" onClick={handleSearch}>
                        <Search className="text-white w-6 h-6" />
                    </button>
                </div>

                <StudentList students={students} />
            </main>
        </div>
    );
}