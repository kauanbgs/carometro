import { ChevronDown, EllipsisVertical, Trash, Eye } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useState } from "react";
import Text from "./text";

export default function UsersList({ users = [] }) {
    const navigate = useNavigate();

    return (
        <div className="w-full mt-5 relative">
            <div className="grid grid-cols-[1fr_1fr_1fr] px-6 py-4 border-b border-zinc-300">
                <div className="flex items-center gap-1 text-sm font-semibold text-textoPrincipal cursor-pointer select-none">
                    Nome
                </div>
                <div className="flex items-center gap-1 text-sm font-semibold text-textoPrincipal cursor-pointer select-none">
                    Email
                </div>
                <div className="flex items-center gap-1 text-sm font-semibold text-textoPrincipal cursor-pointer select-none">
                    Cargo
                </div>
            </div>

            {users.map((user) => (
                <div
                    key={user.id_instructor}
                    className="grid grid-cols-[1fr_1fr_1fr] px-6 py-3.5 border-b border-zinc-100 hover:bg-textoPrincipal/5 transition-colors relative"
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
