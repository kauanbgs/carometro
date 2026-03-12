const colorMap = {
    azulPrincipal: {
        fill: "bg-[var(--azulPrincipal)] text-white hover:bg-[var(--azulPrincipal)]/80 active:bg-[var(--azulPrincipal)]/95",
        outline: "border-1 border-[var(--azulPrincipal)] text-[var(--azulPrincipal)] hover:bg-[var(--azulPrincipal)] hover:text-white",
    },
    azulSecundario: {
        fill: "bg-[var(--azulSecundario)] text-white hover:bg-[var(--azulSecundario)]/80 active:bg-[var(--azulSecundario)]/95",
        outline: "border-1 border-[var(--azulSecundario)] text-[var(--azulSecundario)] hover:bg-[var(--azulSecundario)] hover:text-white",
    },
    erro: {
        fill: "bg-[var(--erro)] text-white hover:bg-[var(--erro)]/80 active:bg-[var(--erro)]/95",
        outline: "border-1 border-[var(--erro)] text-[var(--erro)] hover:bg-[var(--erro)] hover:text-white",
    },
}

export default function Button({ text, onClick, fill, color = "azulPrincipal", type = "submit" }) {
    const variant = fill ? "fill" : "outline"
    const colorClass = colorMap[color]?.[variant] ?? colorMap.azulPrincipal[variant]

    return (
        <button
            onClick={onClick}
            type={type}
            className={`${colorClass} p-2 rounded-full w-full cursor-pointer transition-all duration-200`}
        >
            {text}
        </button>
    )
}