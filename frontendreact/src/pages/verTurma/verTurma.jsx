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
import { ChevronLeft } from "lucide-react"; 
import { Snackbar } from "../../components/snackbar";

export default function VerTurma() {
    const { id_class } = useParams();
    const [students, setStudents] = useState([]);
    const [nomeDaTurma, setNomeDaTurma] = useState("");
    const [aluno, setAluno] = useState({
        name: "",
        email: "",
        phone: "",
        status: 1,
        student_number: "",
        fk_id_class: id_class
    });
    const [nomeDoAluno, setNomeDoAluno] = useState("");
    const [numeroDoAluno, setNumeroDoAluno] = useState("");
    const [snackbar, setSnackbar] = useState({ isOpen: false, message: "", type: "success" });



    useEffect(() => {
        api.getAlunosByTurma(id_class).then((response) => {
            const data = response.data;
            console.log(data);
            setStudents(data.students || []);
        }).catch(() => setStudents([]));
        api.getTurmaById(id_class).then((response) => {
            const data = response.data.class;
            console.log(data);
            setNomeDaTurma(data.name_class || "oii");
        }).catch(() => setNomeDaTurma(""));
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

    const handleCreateAluno = async () => {

        await api.createStudent({
            ...aluno,
            create_date: new Date().toISOString().split('T')[0]
        }).then((response) => {
            setSnackbar({ isOpen: true, message: response?.data?.message || "Aluno criado com sucesso", type: "success" });
            setAluno({
                name: "",
                email: "",
                phone: "",
                status: 1,
                student_number: "",
                fk_id_class: id_class
            });
            handleSearch();
        }).catch((error) => {
            setSnackbar({ isOpen: true, message: error.response?.data?.error || "Erro ao criar aluno", type: "error" });
        });
    }
    const [modalAberto, setModalAberto] = useState(false);

    return (
        <div className="h-screen w-screen bg-[var(--back)] flex">
            <SideBar items={items} />
            <main className="flex-1 ml-[22%] p-10 overflow-y-auto bg-[var(--background)] rounded-l-3xl">
                <Modal isOpen={modalAberto} onClose={() => setModalAberto(false)} title="Criar Aluno">
                                <div className="flex flex-col gap-4">
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-sm font-medium text-zinc-700">Nome do Aluno</label>
                                        <Input
                                            placeholder="Ex: Kauan Borges Plaza"
                                            value={aluno.name}
                                            onChange={(e) => setAluno({ ...aluno, name: e.target.value })}
                                        />
                                    </div>
                
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-sm font-medium text-zinc-700">Numero do Aluno</label>
                                        <Input
                                            placeholder="Ex: 15"
                                            value={aluno.student_number}
                                            onChange={(e) => setAluno({ ...aluno, student_number: e.target.value })}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-sm font-medium text-zinc-700">Email do Aluno</label>
                                        <Input
                                            placeholder="Ex: kauanbgs13@gmail.com"
                                            value={aluno.email}
                                            onChange={(e) => setAluno({ ...aluno, email: e.target.value })}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-sm font-medium text-zinc-700">Telefone do Aluno</label>
                                        <Input
                                            placeholder="Ex: (11) 99999-9999"
                                            value={aluno.phone}
                                            onChange={(e) => setAluno({ ...aluno, phone: e.target.value })}
                                        />
                                    </div>
                
                                    <div className="flex justify-end gap-3 mt-2">
                                        <Button 
                                            color="preto" 
                                            rounded="lg" 
                                            text="Cancelar" 
                                            type="button"
                                            onClick={() => setModalAberto(false)} 
                                        />
                                        <Button 
                                            color="azulPrincipal" 
                                            fill 
                                            rounded="lg" 
                                            text="Criar" 
                                            type="button"
                                            onClick={handleCreateAluno}
                                        />
                                    </div>
                                </div>
                            </Modal>
                <div className="flex items-center gap-2">
                    <ChevronLeft className="w-6 h-6 cursor-pointer" onClick={() => window.history.back()} />
                    <Text variant="title">{nomeDaTurma}</Text>
                </div>
                
                <div className="flex flex-wrap justify-start gap-5 items-center mt-5">
                    <Input placeholder="Nome do aluno" onChange={(e) => setNomeDoAluno(e.target.value)}/>
                    <Input placeholder="Número do aluno" onChange={(e) => setNumeroDoAluno(e.target.value)}/>
                    <button className="flex items-center gap-2 bg-gray-800 px-5 py-2.5 rounded-lg cursor-pointer hover:bg-gray-700 transition-colors" onClick={handleSearch}>
                        <Search className="text-white w-6 h-6" />
                    </button>
                    <Button color="preto" text="Adicionar Aluno" className="rounded-lg" onClick={() => setModalAberto(true)} />
                </div>

                <StudentList students={students} />
            </main>
            <Snackbar 
                isOpen={snackbar.isOpen} 
                message={snackbar.message} 
                type={snackbar.type} 
                onClose={() => setSnackbar({ ...snackbar, isOpen: false })} 
            />
        </div>
    );
}