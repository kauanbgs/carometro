import { X } from "lucide-react";

export default function Modal({ isOpen, onClose, title, children }) {
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            onClick={onClose}
        >
            <div
                className="bg-white rounded shadow-xl w-full max-w-lg mx-4"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-200">
                    <h2 className="text-lg font-semibold text-zinc-800">{title}</h2>
                    <button
                        onClick={onClose}
                        className="p-1 rounded-lg hover:bg-zinc-100 transition-colors cursor-pointer"
                    >
                        <X className="w-5 h-5 text-zinc-500" />
                    </button>
                </div>

                {/* Body */}
                <div className="px-6 py-5">
                    {children}
                </div>
            </div>
        </div>
    );
}
