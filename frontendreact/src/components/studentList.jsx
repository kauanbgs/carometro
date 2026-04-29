import { ChevronDown, EllipsisVertical, Trash } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useState } from "react";
import api from "../axios/axios";
import Modal from "./modal";
import Text from "./text";
import Button from "./button";
import { Snackbar } from "./snackbar";

export default function StudentList({ students = [], onDeleteSuccess }) {
    const navigate = useNavigate();
    const [idMenuAberto, setIdMenuAberto] = useState(null);
    const [alunoParaExcluir, setAlunoParaExcluir] = useState(null);
    const [snackbar, setSnackbar] = useState({ message: "", type: "" });

    function handleExcluirAluno() {
        if (!alunoParaExcluir) return;

        api.deleteStudent(alunoParaExcluir.id_student).then(() => {
            setSnackbar({ message: "Aluno excluído com sucesso!", type: "success" });
            setAlunoParaExcluir(null);
            setIdMenuAberto(null);
            if (onDeleteSuccess) {
                onDeleteSuccess();
            }
        }).catch((err) => {
            setSnackbar({ message: err.response?.data?.error || "Erro ao excluir aluno", type: "error" });
        });
    }

    return (
        <div className="w-full mt-5 relative">
            <Snackbar 
                isOpen={snackbar.message !== ""} 
                message={snackbar.message} 
                type={snackbar.type} 
                onClose={() => setSnackbar({ message: "", type: "" })} 
            />

            <Modal 
                isOpen={alunoParaExcluir} 
                onClose={() => setAlunoParaExcluir(null)} 
                title="Excluir Aluno"
            >
                <div className="flex flex-col gap-4">
                    <Text variant="text">
                        Tem certeza que deseja excluir o aluno <span className="font-bold">{alunoParaExcluir?.name}</span>? 
                        Esta ação não pode ser desfeita.
                    </Text>
                    <div className="flex justify-end gap-3 mt-2">
                        <Button 
                            color="textoPrincipal" 
                            rounded="lg" 
                            text="Cancelar" 
                            onClick={() => setAlunoParaExcluir(null)} 
                        />
                        <Button 
                            color="erro" 
                            fill 
                            rounded="lg" 
                            text="Excluir" 
                            onClick={handleExcluirAluno} 
                        />
                    </div>
                </div>
            </Modal>

            <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr] px-6 py-4 border-b border-zinc-300">
                <div className="flex items-center gap-1 text-sm font-semibold text-textoPrincipal cursor-pointer select-none">
                    Nome
                </div>
                <div className="flex items-center gap-1 text-sm font-semibold text-textoPrincipal cursor-pointer select-none">
                    Turma
                </div>
                <div className="flex items-center gap-1 text-sm font-semibold text-textoPrincipal cursor-pointer select-none">
                    Número
                </div>
                <div className="flex items-center gap-1 text-sm font-semibold text-textoPrincipal cursor-pointer select-none">
                    Status
                </div>
                <div className="flex items-center gap-1 text-sm font-semibold text-textoPrincipal cursor-pointer select-none">
                    Ações
                </div>
            </div>

            {students.map((aluno) => (
                <div
                    key={aluno.id_student}
                    className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr] px-6 py-3.5 border-b border-zinc-100 hover:bg-textoPrincipal/5 transition-colors relative"
                >
                    <div className="text-sm text-textoPrincipal/90 cursor-pointer" onClick={() => navigate(`/aluno/${aluno.id_student}`)}>{aluno.name ? aluno.name : aluno.student_name}</div>
                    <div className="text-sm text-textoPrincipal/90 cursor-pointer" onClick={() => navigate(`/aluno/${aluno.id_student}`)}>{aluno.class_name}</div>
                    <div className="text-sm text-textoPrincipal/90 cursor-pointer" onClick={() => navigate(`/aluno/${aluno.id_student}`)}>{aluno.student_number}</div>
                    <div className="text-sm cursor-pointer" onClick={() => navigate(`/aluno/${aluno.id_student}`)}>
                        <span className={`px-5 py-1.5 border border-zinc-300 rounded text-xs font-medium ${
                            aluno.status === 1
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                        }`}>
                            {aluno.status === 1 ? "Ativo" : "Inativo"}
                        </span>
                    </div>
                    <div className="text-sm text-textoPrincipal relative">
                        <div>
                            <EllipsisVertical 
                                className="w-5 h-5 cursor-pointer hover:text-zinc-500 transition-colors" 
                                onClick={() => setIdMenuAberto(idMenuAberto === aluno.id_student ? null : aluno.id_student)} 
                            />
                        </div>
                        
                        {idMenuAberto === aluno.id_student && (
                            <div 
                                className="absolute right-0 top-full mt-1 bg-back shadow-xl border border-background/20 rounded-lg py-2 z-40 min-w-[160px]"
                                onMouseLeave={() => setIdMenuAberto(null)}
                            >
                                <div 
                                    className="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-red-500/10 transition-colors text-red-600"
                                    onClick={() => setAlunoParaExcluir(aluno)}
                                >
                                    <Trash className="w-4 h-4" />
                                    <Text variant="text" color="erro" className="text-sm font-medium">Excluir aluno</Text>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            ))}

            {students.length === 0 && (
                <div className="px-6 py-8 text-center text-sm text-textoPrincipal/40">
                    Nenhum aluno encontrado nesta turma.
                </div>
            )}
        </div>
    )
}

