import { CheckCircle2, XCircle, AlertCircle, X } from "lucide-react";
import { useEffect } from "react";
import Text from "./text";
import translate from "../utils/ptTranslation";

const styles = {
    success: {
        bg: "bg-green-50",
        border: "border-green-200",
        text: "text-green-800",
        icon: <CheckCircle2 className="w-5 h-5 text-green-500" />
    },
    error: {
        bg: "bg-red-50",
        border: "border-red-200",
        text: "text-red-800",
        icon: <XCircle className="w-5 h-5 text-red-500" />
    },
    warning: {
        bg: "bg-amber-50",
        border: "border-amber-200",
        text: "text-amber-800",
        icon: <AlertCircle className="w-5 h-5 text-amber-500" />
    }
};

export function Snackbar({ isOpen, message, type = "success", onClose, duration = 2000 }) {
    useEffect(() => {
        if (isOpen) {
            const timer = setTimeout(() => {
                onClose();
            }, duration);
            return () => clearTimeout(timer);
        }
    }, [isOpen, duration, onClose]);

    if (!isOpen) return null;

    const currentStyle = styles[type] || styles.success;

    return (
        <div className="fixed top-10 left-1/2 -translate-x-1/2 z-[100] duration-300 min-w-96">
            <div className={`flex items-center gap-3 px-4 py-3 rounded-xl ${currentStyle.bg} ${currentStyle.border}`}>
                {currentStyle.icon}
                <Text variant="text" className={`text-sm font-medium ${currentStyle.text}`}>
                    {translate(message)}
                </Text>
                <button 
                    onClick={onClose}
                    className="fixed right-2 p-1 rounded-lg hover:bg-black/5 transition-colors cursor-pointer"
                >
                    <X className="w-4 h-4 text-zinc-400" />
                </button>
            </div>
        </div>
    );
}
