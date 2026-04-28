import { ChevronDown, EllipsisVertical, Trash, Eye } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useState } from "react";
import Text from "./text";

export default function UsersList({ users = [] }) {
    const navigate = useNavigate();
    const [idMenuAberto, setIdMenuAberto] = useState(null);

    return (
        <div className="w-full mt-5 relative">
            <div className="grid grid-cols-[2fr_2fr_1fr_1fr] px-6 py-4 border-b border-zinc-300">
                <div className="flex items-center gap-1 text-sm font-semibold text-textoPrincipal cursor-pointer select-none">
                    Nome <ChevronDown className="w-4 h-4" />
                </div>
                <div className="flex items-center gap-1 text-sm font-semibold text-textoPrincipal cursor-pointer select-none">
                    Email <ChevronDown className="w-4 h-4" />
                </div>
                <div className="flex items-center gap-1 text-sm font-semibold text-textoPrincipal cursor-pointer select-none">
                    Cargo <ChevronDown className="w-4 h-4" />
                </div>
                <div className="flex items-center gap-1 text-sm font-semibold text-textoPrincipal cursor-pointer select-none">
                    Ações
                </div>
            </div>

            {users.map((user) => (
                <div
                    key={user.id_instructor}
                    className="grid grid-cols-[2fr_2fr_1fr_1fr] px-6 py-3.5 border-b border-zinc-100 hover:bg-textoPrincipal/5 transition-colors relative"
                >
                    <div
                        className="text-sm text-textoPrincipal/90 cursor-pointer"
                        onClick={() => navigate(`/instrutor/${user.id_instructor}`)}
                    >
                        {user.name}
                    </div>
                    <div
                        className="text-sm text-textoPrincipal/90 cursor-pointer"
                        onClick={() => navigate(`/instrutor/${user.id_instructor}`)}
                    >
                        {user.email}
                    </div>
                    <div
                        className="text-sm text-textoPrincipal/90 cursor-pointer"
                        onClick={() => navigate(`/instrutor/${user.id_instructor}`)}
                    >
                        {user.role || "Instructor"}
                    </div>
                    <div className="text-sm text-textoPrincipal relative">
                        <div>
                            <EllipsisVertical
                                className="w-5 h-5 cursor-pointer hover:text-zinc-500 transition-colors"
                                onClick={() => setIdMenuAberto(idMenuAberto === user.id_instructor ? null : user.id_instructor)}
                            />
                        </div>

                        {idMenuAberto === user.id_instructor && (
                            <div
                                className="absolute right-0 top-full mt-1 bg-back shadow-xl border border-background/20 rounded-lg py-2 z-40 min-w-[160px]"
                                onMouseLeave={() => setIdMenuAberto(null)}
                            >
                                <div
                                    className="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-textoPrincipal/10 transition-colors"
                                    onClick={() => {
                                        setIdMenuAberto(null);
                                        navigate(`/instrutor/${user.id_instructor}`);
                                    }}
                                >
                                    <Eye className="w-4 h-4 text-textoPrincipal" />
                                    <Text variant="text" className="text-sm font-medium">Ver instrutor</Text>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            ))}

            {users.length === 0 && (
                <div className="px-6 py-8 text-center text-sm text-textoPrincipal/40">
                    Nenhum instrutor encontrado.
                </div>
            )}
        </div>
    )
}
