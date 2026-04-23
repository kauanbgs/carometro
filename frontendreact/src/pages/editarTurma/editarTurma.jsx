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
import { ChevronLeft } from "lucide-react";
import { Snackbar } from "../../components/snackbar.jsx";
import { useNavigate, useLocation } from "react-router-dom";

export default function EditarTurma() {

    const user = JSON.parse(localStorage.getItem("user"));

    const navigate = useNavigate();
    const { criar } = useLocation().state || { };
    let importar = false;
    
    const [classes, setClasses] = useState([]);
    const [nomeDaTurma, setNomeDaTurma] = useState("");
    const [nomeDoProfessor, setNomeDoProfessor] = useState("");
    const [modalAberto, setModalAberto] = useState(false);
    const [snackbar, setSnackbar] = useState({ message: "", type: "" });

    // Estado do formulário do modal
    const [novaTurma, setNovaTurma] = useState("");
    const [instrutores, setInstrutores] = useState([]);
    const [instrutorSelecionado, setInstrutorSelecionado] = useState("");
    const [modalClassesAberto, setModalClassesAberto] = useState(false);
    const [googleClasses, setGoogleClasses] = useState([]);
    const [gClassSelecionada, setGClassSelecionada] = useState("");
    const [gNomeDaTurma, setGNomeDaTurma] = useState("");

    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        api.getTurmas().then((response) => {
            setClasses(response.data.classes || []);
        }).catch(() => setClasses([]));
    }, []);

    useEffect(() => {
        if (user && user.id_instructor) {
            api.getClassesGoogle(user.id_instructor)
                .then(() => {
                    setIsConnected(true);
                })
                .catch(() => {
                    setIsConnected(false);
                });
        }

        if(modalClassesAberto && isConnected){
            api.getClassesGoogle(user.id_instructor).then((response) => {
                console.log(response.data)
                setGoogleClasses(response.data || []);
            }).catch(() => setGoogleClasses([]));
        }
        else if (modalClassesAberto) {
            navigate('/conexoes', { state: { snackbar: 'Você não está conectado ao Google Classroom!' } })
        }
    }, [modalClassesAberto]);


    

    useEffect(() => {
        if (modalAberto) {
            api.getDocentes().then((response) => {
                setInstrutores(response.data.instructors);
            }).catch(() => setInstrutores([]));
        }
    }, [modalAberto]);

    useEffect(() => {
        if (criar) {
            setModalAberto(true);
        }
    }, []);

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
        if (!novaTurma.trim() || !instrutorSelecionado) {
            setSnackbar({ message: "Preencha todos os campos", type: "error" });
            return;
        }

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
            setSnackbar({ message: "Turma criada com sucesso!", type: "success" });
        }).catch((err) => {
            setSnackbar({ message: err.response?.data?.error || "Erro ao criar turma", type: "error" });
        });
    }

    function handleImportarGClass(){
        if (!gClassSelecionada) {
            setSnackbar({ message: "Selecione uma turma", type: "error" });
            return;
        }

        api.getAlunosByGClass(gClassSelecionada, user.id_instructor).then((response) => {
            setModalClassesAberto(false);
            setGClassSelecionada("");
            api.postCriarTurma({
                name: gNomeDaTurma,
                fk_id_instructor: user.id_instructor,
            }).then(async (resTurma) => {
                const novaTurmaId = resTurma.data.id_class;
                
                const promisesAlunos = response.data.map((alunoGoogle, index) => {
                    return api.createStudent({
                        name: alunoGoogle.profile.name.fullName,
                        email: null,
                        phone: null,
                        status: 1,
                        student_number: index + 1,
                        fk_id_class: novaTurmaId
                    });
                });

                await Promise.all(promisesAlunos);

                setModalAberto(false);
                setNovaTurma("");
                setInstrutorSelecionado("");
                api.getTurmas().then((resTurmas) => {
                    setClasses(resTurmas.data.classes || []);
                }).catch(() => setClasses([]));
                setSnackbar({ message: "Turma e alunos importados com sucesso!", type: "success" });
            }).catch((err) => {
                setSnackbar({ message: err.response?.data?.error || "Erro ao criar turma", type: "error" });
            });
        }).catch((err) => {
            setSnackbar({ message: err.response?.data?.error || "Erro ao importar alunos", type: "error" });
        });
    }

    return (
        <div className="h-screen w-screen bg-back flex">
            <SideBar items={items} />
            <Snackbar 
                isOpen={snackbar.message !== ""} 
                message={snackbar.message} 
                type={snackbar.type} 
                onClose={() => setSnackbar({ message: "", type: "" })} 
            />
            <main className="flex-1 ml-[22%] p-10 overflow-y-auto bg-background rounded-l-3xl">
                <div className="flex items-center gap-2">
                    <ChevronLeft className="w-6 h-6 cursor-pointer text-textoPrincipal" onClick={() => navigate("/home")} />
                    <Text variant="title">Gerenciar Turmas</Text>
                </div>
                
                <div className="flex flex-wrap justify-start gap-5 items-center mt-5 text-textoPrincipal">
                    <Input placeholder="Nome da turma" value={nomeDaTurma} onChange={(e) => setNomeDaTurma(e.target.value)}/>
                    <Input placeholder="Professor" value={nomeDoProfessor} onChange={(e) => setNomeDoProfessor(e.target.value)}/>
                    <button className="flex items-center gap-2 bg-textoPrincipal/90 px-5 py-2.5 rounded-lg cursor-pointer hover:bg-gray-700 transition-colors" onClick={buscar}>
                        <Search className="text-background w-6 h-6" />
                    </button>
                    <Button color="branco" rounded="lg" text="Criar Turma" onClick={() => setModalAberto(true)} />
                </div>

                <List classes={classes} onDeleteSuccess={buscar} />
            </main>

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
                            className="p-2 h-12 rounded-lg text-sm border border-zinc-300 bg-white focus:outline-none focus:border-azulPrincipal"
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
                            text="Importar do Classroom" 
                            type="button"
                            onClick={() => {setModalClassesAberto(true)}} 
                        />
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
            <Modal isOpen={modalClassesAberto} onClose={() => setModalClassesAberto(false)} title="Turmas do Google Classroom">
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1.5">
                        <select
                            value={gClassSelecionada}
                            onChange={(e) => {
                                setGClassSelecionada(e.target.value);
                                setGNomeDaTurma(e.target.options[e.target.selectedIndex].text);
                            }}
                            className="p-2 h-12 rounded-lg text-sm border border-zinc-300 bg-white focus:outline-none focus:border-azulPrincipal"
                        >
                            <option value="">Selecione uma turma</option>
                            {googleClasses.map((gClass) => (
                                <option key={gClass.id} value={gClass.id}>
                                    {gClass.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex justify-end gap-3 mt-2">
                        <Button color="preto" rounded="lg" text="Cancelar" type="button" onClick={() => setModalClassesAberto(false)} />
                        <Button color="azulPrincipal" fill rounded="lg" text="Importar" type="button" onClick={() => {handleImportarGClass()}} />
                    </div>
                </div>
            </Modal>
        </div>
    );
}