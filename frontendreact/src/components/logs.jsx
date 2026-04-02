import Text from "./text";
import { ChevronDownIcon } from "lucide-react";
const colorMap = {
    delecao: "bg-[var(--erro)]/50",
    criacao: "bg-[var(--sucesso)]/90",
    ocorrencia: "bg-[var(--laranjaSecundario)]/70",
    registro: "bg-[var(--azulSecundario)]/50",
}

export default function Logs({ children, color }) {
    return (
        <div className={`flex flex-row border-1 border-black/30 h-10 justify-between p-2 w-full rounded-full ${colorMap[color]}`}>
            <div className="flex items-center gap-2 ml-2">
                <Text variant="text">{children}</Text>
            </div>
            <div className="flex items-center gap-2 ml-2">
                <ChevronDownIcon className="w-5 h-5" />
            </div>

        </div>
    )
}