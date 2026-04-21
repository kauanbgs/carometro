import { useParams } from "react-router-dom"
import api from "../../axios/axios"
import { useEffect, useState } from "react"
import SideBar from "../../components/sideBar"
import items from "../../utils/itemSideBar"
import Text from "../../components/text"
import Input from "../../components/input"
import Button from "../../components/button"
import { ChevronLeft } from "lucide-react"
import { Pencil } from "lucide-react"
import Select from "../../components/select"
import Occurrence from "../../components/occurrence"
import { Snackbar } from "../../components/snackbar"


import Modal from "../../components/modal"

export default function Aluno() {
    const { id_student } = useParams();
    const [student, setStudent] = useState({});
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        status: "",
        student_number: "",
        fk_id_class: "",
        });
    const [classes, setClasses] = useState([]);
    const [occurrence, setOccurrence] = useState({
        type: "",
        description: "",
        fk_id_student: id_student,
        fk_id_instructor: JSON.parse(localStorage.getItem("user")).id_instructor
    });
    const [occurrences, setOccurrences] = useState([]);
    const [selectedOccurrence, setSelectedOccurrence] = useState(null);
    const [modalExcluirAberto, setModalExcluirAberto] = useState(false);
    const [modalOcorrenciaAberta, setModalOcorrenciaAberta] = useState(false);

    const [snackbar, setSnackbar] = useState({ isOpen: false, message: "", type: "success" });

    useEffect(() => {
        const searchStudent = async () => {
            try {
                const response = await api.getAlunoById(id_student);
                const data = response.data.students[0];
                console.log(response.data)
                setStudent(data);
                setFormData({
                    name: data.name,
                    email: data.email,
                    phone: data.phone,
                    status: data.status,
                    student_number: data.student_number,
                    fk_id_class: data.fk_id_class,
                });
            } catch (error) {
                console.log(error);
                setSnackbar({ isOpen: true, message: "Erro ao carregar dados do aluno", type: "error" });
            }
        };
        searchStudent()
    }, [id_student]);

    const handleSave = async () => {
        try {
            const response = await api.updateStudent(id_student, formData);
            if(response.status === 200) {
                setSnackbar({ isOpen: true, message: "Cadastro atualizado com sucesso!", type: "success" });
                setStudent({ ...student, name: formData.name });
            }
        } catch (error) {
            console.log(error);
            setSnackbar({ isOpen: true, message: error.response?.data?.error || "Erro ao salvar alterações", type: "error" });
        }
    }

    useEffect(() => {
        const searchClasses = async () => {
            try {
                const response = await api.getTurmas();
                setClasses(response.data.classes);
            } catch (error) {
                console.log(error);
            }
        };
        searchClasses()
    }, []);

    const handleDelete = async () => {
        try {
            const response = await api.deleteStudent(id_student);
            if(response.status === 200) {
                // Não mostramos snackbar aqui porque vamos navegar para trás
                window.history.back();
            }
        } catch (error) {
            console.log(error);
            setSnackbar({ isOpen: true, message: error.response?.data?.error || "Erro ao excluir aluno", type: "error" });
        }
    }

    const fetchOccurrences = async () => {
        try {
            const response = await api.getOccurrences(id_student);
            setOccurrences(response.data.occurrences || []);
        } catch (error) {
            console.log(error);
        }
    };

    const handleSaveOccurrence = async () => {
        if (!occurrence.type || !occurrence.description) {
            setSnackbar({ isOpen: true, message: "Preencha todos os campos da ocorrência!", type: "warning" });
            return;
        }
        try {
            await api.createOccurrence(occurrence);
            setSnackbar({ isOpen: true, message: "Ocorrência registrada!", type: "success" });
            setOccurrence({ ...occurrence, type: "", description: "" });
            fetchOccurrences();
        } catch (error) {
            console.log(error);
            setSnackbar({ isOpen: true, message: error.response?.data?.error || "Erro ao registrar", type: "error" });
        }
    }

    useEffect(() => {
        fetchOccurrences();
    }, [id_student]);

    const openOccurrenceDetails = (occ) => {
        setSelectedOccurrence(occ);
        setModalOcorrenciaAberta(true);
    }

    const handleDeleteOccurrence = async (id_occurrence) => {
        try {
            const response = await api.deleteOccurrence(id_occurrence);
            if(response.status === 200) {
                setSnackbar({ isOpen: true, message: "Ocorrência removida", type: "success" });
                fetchOccurrences();
                setModalOcorrenciaAberta(false);
            }
        } catch (error) {
            console.log(error);
            setSnackbar({ isOpen: true, message: "Erro ao excluir ocorrência", type: "error" });
        }
    }

    const handleUpdateOccurrence = async () => {
        try {
            const response = await api.updateOccurrence(selectedOccurrence.id_occurrence, selectedOccurrence);
            if(response.status === 200) {
                setSnackbar({ isOpen: true, message: "Ocorrência alterada com sucesso!", type: "success" });
                fetchOccurrences();
                setModalOcorrenciaAberta(false);
            }
        } catch (error) {
            console.log(error);
            setSnackbar({ isOpen: true, message: "Erro ao atualizar ocorrência", type: "error" });
        }
    }

    return (
        <div className="h-screen w-screen bg-[var(--back)] flex">
            <SideBar items={items} />
            <main className="flex-1 ml-[22%] p-10 overflow-y-auto bg-[var(--background)] rounded-l-3xl">
                
                <Modal 
                    isOpen={modalExcluirAberto} 
                    onClose={() => setModalExcluirAberto(false)} 
                    title="Confirmar Exclusão"
                >
                    <div className="flex flex-col">
                        <Text variant="text" className="text-zinc-600 mb-6">
                            Tem certeza que deseja excluir o aluno {student.name}? Esta ação não pode ser desfeita.
                        </Text>
                        <div className="flex gap-3 justify-end">
                            <Button color="preto" rounded="lg" text="Cancelar" onClick={() => setModalExcluirAberto(false)} />
                            <Button color="erro" rounded="lg" fill text="Excluir Aluno" onClick={handleDelete} />
                        </div>
                    </div>
                </Modal>

                <Modal 
                    isOpen={modalOcorrenciaAberta} 
                    onClose={() => setModalOcorrenciaAberta(false)} 
                    title="Editar Ocorrência"
                >
                    {selectedOccurrence && (
                        <div className="flex flex-col gap-4">
                            <div>
                                <label className="text-xs text-zinc-400 uppercase">Motivo</label>
                                <Select 
                                    width="w-full"
                                    value={selectedOccurrence.type}
                                    onChange={(e) => setSelectedOccurrence({ ...selectedOccurrence, type: e.target.value })}
                                >
                                    <option value="Falta">Falta</option>
                                    <option value="Atraso">Atraso</option>
                                    <option value="Outro">Outro</option>
                                </Select>
                            </div>
                            <div>
                                <label className="text-xs text-zinc-400 uppercase">Descrição</label>
                                <textarea 
                                    className="w-full p-4 bg-zinc-50 rounded-lg border border-zinc-200 mt-1 focus:outline-none text-sm text-zinc-700 h-32 transition-all"
                                    value={selectedOccurrence.description}
                                    onChange={(e) => setSelectedOccurrence({ ...selectedOccurrence, description: e.target.value })}
                                />
                            </div>
                            <div className="flex justify-between items-center mt-2">
                                <Button color="erro" rounded="lg" text="Excluir Ocorrência" onClick={() => handleDeleteOccurrence(selectedOccurrence.id_occurrence)} />
                                <div className="flex gap-2">
                                    <Button color="preto" rounded="lg" text="Cancelar" onClick={() => setModalOcorrenciaAberta(false)} />
                                    <Button color="azulPrincipal" fill rounded="lg" text="Salvar" onClick={handleUpdateOccurrence} />
                                </div>
                            </div>
                        </div>
                    )}
                </Modal>
                
                <div className="flex items-center gap-2">
                    <ChevronLeft className="w-6 h-6 cursor-pointer" onClick={() => window.history.back()} />
                    <Text variant="megaTitle" className="font-bold">{student.name}</Text>
                    <Button color="erro" rounded="lg" text="Excluir Aluno" className="ml-auto mr-4" onClick={() => setModalExcluirAberto(true)} />
                </div>
                <Text variant="title" className="text-lg font-bold mt-4">Informações do Aluno</Text>
                <div className="grid grid-cols-[3fr_2fr_1fr] gap-4 mt-5 w-[80%]">
                    <Input label="Nome do aluno" placeholder="Nome" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="placeholder:text-zinc-400 w-full" />
                    <div>
                        <Text variant="text" className="text-zinc-500 text-sm">Turma</Text>
                        <select className="w-full p-2 h-12 rounded-lg text-sm border border-zinc-300 focus:outline-none" 
                                value={formData.fk_id_class} 
                                onChange={(e) => setFormData({ ...formData, fk_id_class: e.target.value })}>
                            <option value="">Selecione uma turma</option>
                            {classes.map((classe) => (
                                <option key={classe.id_class} value={classe.id_class}>{classe.name}</option>
                            ))}
                        </select>
                    </div>
                    <Input label="Número" placeholder="Número" value={formData.student_number} onChange={(e) => setFormData({ ...formData, student_number: e.target.value })} className="placeholder:text-zinc-400 w-full" />
                </div>

                 <div className="grid grid-cols-[1fr_3fr_1fr_1fr] gap-4 mt-4 w-[80%] items-center">
                    <div>
                        <Text variant="text" className="text-zinc-500 text-sm mb-1">Status</Text>
                        <select className="w-full p-2 h-12 rounded-lg text-sm border border-zinc-300 focus:outline-none focus:border-[var(--azulPrincipal)]" 
                                value={formData.status} 
                                onChange={(e) => setFormData({ ...formData, status: e.target.value })}>
                            <option value={1}>Ativo</option>
                            <option value={0}>Inativo</option>
                        </select>
                    </div>
                    <Input label="Email" placeholder="Email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="placeholder:text-zinc-400 w-full" />
                    <Input label="Telefone" placeholder="Telefone" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="placeholder:text-zinc-400 w-full" />
                    <button className="w-full h-12 mt-5 flex items-center justify-center bg-[var(--azulPrincipal)] rounded-lg cursor-pointer hover:bg-[var(--azulSecundario)] transition-colors" onClick={handleSave}>
                        <Pencil className="w-6 h-6 text-white" />
                    </button>
                </div>
                
                <div className="mt-12 flex flex-col w-full">
                    <div className="w-[80%]">
                        <Text variant="title" className="text-zinc-700 font-semibold mb-6">Registrar Ocorrência</Text>
                        
                        <div className="grid grid-cols-[1.5fr_3fr_auto] gap-4 items-end">
                            <div className="flex flex-col">
                                <Text variant="text" className="text-zinc-500 text-sm mb-1">Motivo</Text>
                                <Select  
                                    width="w-full"
                                    value={occurrence.type} 
                                    onChange={(e) => setOccurrence({ ...occurrence, type: e.target.value })}>
                                    <option value="">Selecione um motivo</option>
                                    <option value="Falta">Falta</option>
                                    <option value="Atraso">Atraso</option>
                                    <option value="Outro">Outro</option>
                                </Select>
                            </div>

                            <Input 
                                label="Descrição" 
                                placeholder="Descreva a ocorrência..." 
                                value={occurrence.description} 
                                onChange={(e) => setOccurrence({ ...occurrence, description: e.target.value })} 
                                className="placeholder:text-zinc-400 w-full" 
                            />

                            <button onClick={handleSaveOccurrence} className="h-12 px-6 flex items-center justify-center bg-zinc-800 rounded-lg cursor-pointer hover:bg-zinc-700 transition-colors">
                                <Text variant="text" className="text-white font-medium" >Registrar</Text>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="p-10 rounded-3xl mt-4 w-[80%]">
                    <Text variant="title" className="text-zinc-700 font-semibold mb-8 text-center">Histórico de Ocorrências</Text>
                    <div className="flex flex-col gap-3">
                        {occurrences.length > 0 ? occurrences.map((occ) => (
                            <Occurrence 
                                key={occ.id_occurrence} 
                                id_occurrence={occ.id_occurrence}
                                type={occ.type}
                                message={occ.description} 
                                onClick={() => openOccurrenceDetails(occ)}
                            />
                        )) : (
                            <div className="text-center py-10">
                                <Text variant="text" className="text-zinc-400">Nenhuma ocorrência registrada para este aluno.</Text>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            <Snackbar 
                isOpen={snackbar.isOpen} 
                message={snackbar.message} 
                type={snackbar.type} 
                onClose={() => setSnackbar({ ...snackbar, isOpen: false })} 
            />
        </div>
    )
}
