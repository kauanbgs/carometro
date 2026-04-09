import { Search } from "lucide-react";
import Separator from "../../components/separator";
import SideBar from "../../components/sideBar";
import items from "../../utils/itemSideBar";
import Text from "../../components/text";
import List from "../../components/list";
import Input from "../../components/input";
import Button from "../../components/button";
import Modal from "../../components/modal";
import { useState, useEffect } from "react";
import api from "../../axios/axios";

export default function EditarTurma() {
    const [classes, setClasses] = useState([]);
    const [nomeDaTurma, setNomeDaTurma] = useState("");
    const [nomeDoProfessor, setNomeDoProfessor] = useState("");
    const [modalAberto, setModalAberto] = useState(false);

    // Estado do formulário do modal
    const [novaTurma, setNovaTurma] = useState("");
    const [instrutores, setInstrutores] = useState([]);
    const [instrutorSelecionado, setInstrutorSelecionado] = useState("");

    useEffect(() => {
        api.getTurmas().then((response) => {
            setClasses(response.data.classes || []);
        }).catch(() => setClasses([]));
    }, []);

    // Carrega docentes quando o modal abre
    useEffect(() => {
        if (modalAberto) {
            api.getDocentes().then((response) => {
                setInstrutores(response.data.instructors);
            }).catch(() => setInstrutores([]));
        }
    }, [modalAberto]);

    function buscar() {
        if (nomeDaTurma.trim()) {
            api.getTurmaByName(nomeDaTurma).then((response) => {
                setClasses(response.data.classes);
            }).catch(() => setClasses([]));
        } 
        else if (nomeDoProfessor.trim()) {
            api.getTurmaByInstructorName(nomeDoProfessor).then((response) => {
                setClasses(response.data.classes);
            }).catch(() => setClasses([]));
        }
        else {
            api.getTurmas().then((response) => {
                setClasses(response.data.classes);
            }).catch(() => setClasses([]));
        }
    }

    function criarTurma() {
        if (!novaTurma.trim() || !instrutorSelecionado) return;

        api.postCriarTurma({
            name: novaTurma,
            fk_id_instructor: instrutorSelecionado,
        }).then(() => {
            setModalAberto(false);
            setNovaTurma("");
            setInstrutorSelecionado("");
            api.getTurmas().then((response) => {
                setClasses(response.data.classes || []);
            }).catch(() => setClasses([]));
        }).catch((err) => {
            alert(err.response?.data?.error || "Erro ao criar turma");
        });
    }

    return (
        <div className="h-screen w-screen bg-[var(--back)] flex">
            <SideBar items={items} />
            <main className="flex-1 ml-[22%] p-10 overflow-y-auto bg-[var(--background)] rounded-l-3xl">
                <Text variant="title">Gerenciar Turmas</Text>
                
                <div className="flex flex-wrap justify-start gap-5 items-center mt-5">
                    <Input placeholder="Nome da turma" value={nomeDaTurma} onChange={(e) => setNomeDaTurma(e.target.value)}/>
                    <Input placeholder="Professor" value={nomeDoProfessor} onChange={(e) => setNomeDoProfessor(e.target.value)}/>
                    <button className="flex items-center gap-2 bg-gray-800 px-5 py-2.5 rounded-lg cursor-pointer hover:bg-gray-700 transition-colors" onClick={buscar}>
                        <Search className="text-white w-6 h-6" />
                    </button>
                    <Button color="preto" rounded="lg" text="Criar Turma" onClick={() => setModalAberto(true)} />
                </div>

                <List classes={classes} />
            </main>

            {/* Modal Criar Turma */}
            <Modal isOpen={modalAberto} onClose={() => setModalAberto(false)} title="Criar Turma">
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-medium text-zinc-700">Nome da Turma</label>
                        <Input
                            placeholder="Ex: 3º DS - 2025"
                            value={novaTurma}
                            onChange={(e) => setNovaTurma(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-medium text-zinc-700">Professor</label>
                        <select
                            value={instrutorSelecionado}
                            onChange={(e) => setInstrutorSelecionado(e.target.value)}
                            className="p-2 h-12 rounded-lg text-sm border border-zinc-300 bg-white focus:outline-none focus:border-[var(--azulPrincipal)]"
                        >
                            <option value="">Selecione um professor</option>
                            {instrutores.map((inst) => (
                                <option key={inst.id_instructor} value={inst.id_instructor}>
                                    {inst.name}
                                </option>
                            ))}
                        </select>
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
                            onClick={criarTurma} 
                        />
                    </div>
                </div>
            </Modal>
        </div>
    );
}