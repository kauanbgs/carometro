import { ChevronDown, EllipsisVertical, Trash } from "lucide-react"
import { useNavigate } from "react-router-dom"
import api from "../axios/axios";
import { useState } from "react";
import { Snackbar } from "./snackbar";
import Text from "./text";
import Modal from "./modal";
import Button from "./button";

export default function List({ classes = [], onDeleteSuccess }) {
    const navigate = useNavigate();

    const [snackbar, setSnackbar] = useState({ message: "", type: "" });
    const [idMenuAberto, setIdMenuAberto] = useState(null);
    const [turmaParaExcluir, setTurmaParaExcluir] = useState(null);

    const handleExcluirTurma = () => {
        if (!turmaParaExcluir) return;
        
        api.deleteTurma(turmaParaExcluir.id_class).then(() => {
            setSnackbar({ message: "Turma excluída com sucesso!", type: "success" });
            setTurmaParaExcluir(null);
            setIdMenuAberto(null);
            if (onDeleteSuccess) {
                onDeleteSuccess();
            }
        }).catch((error) => {
            setSnackbar({ message: error.response?.data?.error || "Erro ao excluir turma", type: "error" });
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
                isOpen={turmaParaExcluir} 
                onClose={() => setTurmaParaExcluir(null)} 
                title="Excluir Turma"
            >
                <div className="flex flex-col gap-4">
                    <Text variant="text">
                        Tem certeza que deseja excluir a turma <span className="font-bold">{turmaParaExcluir?.name}</span>? 
                        Esta ação não pode ser desfeita.
                    </Text>
                    <div className="flex justify-end gap-3 mt-2">
                        <Button 
                            color="preto" 
                            rounded="lg" 
                            text="Cancelar" 
                            onClick={() => setTurmaParaExcluir(null)} 
                        />
                        <Button 
                            color="erro" 
                            fill 
                            rounded="lg" 
                            text="Excluir" 
                            onClick={handleExcluirTurma} 
                        />
                    </div>
                </div>
            </Modal>

            <div className="grid grid-cols-[1fr_1fr_1fr] px-6 py-4 border-b border-zinc-300">
                <div className="flex items-center gap-1 text-sm font-semibold text-textoPrincipal cursor-pointer select-none">
                    Nome <ChevronDown className="w-4 h-4" />
                </div>
                <div className="flex items-center gap-1 text-sm font-semibold text-textoPrincipal cursor-pointer select-none">
                    Professor <ChevronDown className="w-4 h-4" />
                </div>
                <div className="flex items-center gap-1 text-sm font-semibold text-textoPrincipal cursor-pointer select-none">
                    Ações <ChevronDown className="w-4 h-4" />
                </div>
            </div>
            {classes.map((turma) => (
                <div
                    key={turma.id_class}
                    className="grid grid-cols-[1fr_1fr_1fr] px-6 py-3.5 border-b border-zinc-100 hover:bg-textoPrincipal/10 transition-colors relative"
                >
                    <div className="text-sm text-textoPrincipal cursor-pointer" onClick={() => navigate(`/verTurma/${turma.id_class}`)}>{turma.name}</div>
                    <div className="text-sm text-textoPrincipal cursor-pointer" onClick={() => navigate(`/verTurma/${turma.id_class}`)}>{turma.instructor_name}</div>
                    <div className="text-sm text-textoPrincipal relative">
                        <EllipsisVertical 
                            className="w-5 h-5 cursor-pointer hover:text-zinc-500 transition-colors" 
                            onClick={() => setIdMenuAberto(idMenuAberto === turma.id_class ? null : turma.id_class)} 
                        />
                        
                        {idMenuAberto === turma.id_class && (
                            <div 
                                className="absolute right-0 top-full mt-1 bg-white shadow-xl border border-zinc-100 rounded-lg py-2 z-40 min-w-[160px]"
                                onMouseLeave={() => setIdMenuAberto(null)}
                            >
                                <div 
                                    className="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-red-50 transition-colors text-red-600"
                                    onClick={() => setTurmaParaExcluir(turma)}
                                >
                                    <Trash className="w-4 h-4" />
                                    <Text variant="text" className="text-sm font-medium">Excluir turma</Text>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            ))}

            {classes.length === 0 && (
                <div className="px-6 py-8 text-center text-sm text-zinc-400">
                    Nenhuma turma encontrada.
                </div>
            )}
        </div>
    )
}
