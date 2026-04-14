import { ChevronDown, EllipsisVertical } from "lucide-react"
import { useNavigate } from "react-router-dom"

export default function StudentList({ students = [] }) {
    const navigate = useNavigate();
    return (
        <div className="w-full mt-5">
            <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr] px-6 py-4 border-b border-zinc-300">
                <div className="flex items-center gap-1 text-sm font-semibold text-zinc-700 cursor-pointer select-none">
                    Nome <ChevronDown className="w-4 h-4" />
                </div>
                <div className="flex items-center gap-1 text-sm font-semibold text-zinc-700 cursor-pointer select-none">
                    Turma <ChevronDown className="w-4 h-4" />
                </div>
                <div className="flex items-center gap-1 text-sm font-semibold text-zinc-700 cursor-pointer select-none">
                    Número <ChevronDown className="w-4 h-4" />
                </div>
                <div className="flex items-center gap-1 text-sm font-semibold text-zinc-700 cursor-pointer select-none">
                    Status <ChevronDown className="w-4 h-4" />
                </div>
                <div className="flex items-center gap-1 text-sm font-semibold text-zinc-700 cursor-pointer select-none">
                    Ações
                </div>
            </div>

            {students.map((aluno) => (
                <div
                    key={aluno.id_student}
                    className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr] px-6 py-3.5 hover:bg-zinc-50 transition-colors cursor-pointer"
                    onClick={() => navigate(`/aluno/${aluno.id_student}`)}
                    >
                    <div className="text-sm text-zinc-800">{aluno.name}</div>
                    <div className="text-sm text-zinc-800">{aluno.class_name}</div>
                    <div className="text-sm text-zinc-800">{aluno.student_number}</div>
                    <div className="text-sm">
                        <span className={`px-5 py-1.5 border border-zinc-300 rounded text-xs font-medium ${
                            aluno.status === 1
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                        }`}>
                            {aluno.status === 1 ? "Ativo" : "Inativo"}
                        </span>
                    </div>
                    <div className="text-sm text-zinc-800">
                        <EllipsisVertical className="w-5 h-5 cursor-pointer" />
                    </div>
                </div>
            ))}

            {students.length === 0 && (
                <div className="px-6 py-8 text-center text-sm text-zinc-400">
                    Nenhum aluno encontrado nesta turma.
                </div>
            )}
        </div>
    )
}
