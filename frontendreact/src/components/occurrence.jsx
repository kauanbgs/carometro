import Text from "./text";
import { ChevronDown } from "lucide-react";

export default function Occurrence({ message, id_occurrence, type, onClick }) {
    return (
        <div
            onClick={onClick}
            className="flex items-center py-2 px-4 rounded-xl w-full bg-zinc-200 hover:bg-zinc-300 transition-all cursor-pointer"
        >
            <div className="flex flex-col flex-1">
                <Text variant="text" color="azulPrincipal" className="text-xs font-bold uppercase mb-0.5">{type}</Text>
                <Text variant="text" className="text-sm text-zinc-700 truncate">{message}</Text>
            </div>
            <div className="ml-4 p-2 rounded-lg group-hover:bg-zinc-100 transition-colors">
                <ChevronDown className="w-5 h-5 text-zinc-400 group-hover:text-zinc-600" />
            </div>
        </div>
    );
}
