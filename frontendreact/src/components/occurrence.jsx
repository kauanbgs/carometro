import Text from "./text";
import { ChevronDown } from "lucide-react";


export default function Occurrence({ message, id_occurrence, type, onClick }) {
    return (
        <div
            onClick={onClick}
            className="flex items-center py-2 px-4 rounded-xl w-full bg-textoPrincipal/10 hover:bg-textoPrincipal/15 transition-all cursor-pointer"
        >
            <div className="flex flex-col flex-1">
                <Text variant="text" color="azulPrincipal" className="text-xs font-bold uppercase mb-0.5">{type}</Text>
                <Text variant="text" className="text-sm text-textoPrincipal truncate">{message}</Text>
            </div>
            <div className="ml-4 p-2 rounded-lg group-hover:bg-textoPrincipal/30 transition-colors">
                <ChevronDown className="w-5 h-5 text-textoPrincipal group-hover:text-textoPrincipal/80" />
            </div>
        </div>
    );
}
