import Text from "./text";
import { ChevronDownIcon } from "lucide-react";

const getColorByType = (type) => {
    switch (type) {
        case "occurrence":
            return "bg-red-500/25 text-red-500";
        case "criacao":
            return "bg-blue-500/25 text-blue-500";
        default:
            return "bg-gray-200/25 text-gray-200";
    }
};

export default function Logs({ children, type }) {
    return (
        <div className={`flex flex-row border border-black/30 h-10 justify-between p-2 w-full rounded-full ${getColorByType(type)}`}>
            <div className="flex items-center gap-2 ml-2 flex-1 min-w-0">
                <Text variant="text" className="truncate">{children}</Text>
            </div>
        </div>
    )
}