import { ChevronDown, EllipsisVertical } from "lucide-react"
import { useNavigate } from "react-router-dom"

export default function List({ classes = [] }) {
    const navigate = useNavigate();

    return (
        <div className="w-full mt-5">
            <div className="grid grid-cols-[1fr_1fr_1fr] px-6 py-4 border-b border-zinc-300">
                <div className="flex items-center gap-1 text-sm font-semibold text-zinc-700 cursor-pointer select-none">
                    Nome <ChevronDown className="w-4 h-4" />
                </div>
                <div className="flex items-center gap-1 text-sm font-semibold text-zinc-700 cursor-pointer select-none">
                    Professor <ChevronDown className="w-4 h-4" />
                </div>
                <div className="flex items-center gap-1 text-sm font-semibold text-zinc-700 cursor-pointer select-none">
                    Ações <ChevronDown className="w-4 h-4" />
                </div>
            </div>
            {classes.map((turma) => (
                <div
                    key={turma.id_class}
                    className="grid grid-cols-[1fr_1fr_1fr] px-6 py-3.5 border-b border-zinc-100 hover:bg-zinc-50 transition-colors"
                >
                    <div className="text-sm text-zinc-800">{turma.name}</div>
                    <div className="text-sm text-zinc-800">{turma.instructor_name}</div>
                    <div className="text-sm text-zinc-800 "><EllipsisVertical className="w-5 h-5 cursor-pointer" onClick={() => navigate(`/verTurma/${turma.id_class}`)} /></div>
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