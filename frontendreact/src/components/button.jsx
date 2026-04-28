const colorMap = {
    azulPrincipal: {
        fill: "bg-azulPrincipal text-white hover:bg-azulPrincipal/80 active:bg-azulPrincipal/95",
        outline: "border-1 border-azulPrincipal text-azulPrincipal hover:bg-azulPrincipal hover:text-white",
    },
    azulSecundario: {
        fill: "bg-azulSecundario text-white hover:bg-azulSecundario/80 active:bg-azulSecundario/95",
        outline: "border-1 border-azulSecundario text-azulSecundario hover:bg-azulSecundario hover:text-white",
    },
    laranjaSecundario: {
        fill: "bg-laranjaSecundario text-black hover:bg-laranjaSecundario/80 active:bg-laranjaSecundario/95",
        outline: "border-1 border-laranjaSecundario text-laranjaSecundario hover:bg-laranjaSecundario hover:text-white",
    },
    erro: {
        fill: "bg-erro text-white hover:bg-erro/80 active:bg-erro/95",
        outline: "border-1 border-erro text-erro hover:bg-erro hover:text-white",
    },
    preto: {
        fill: "bg-black text-white hover:bg-black/80 active:bg-black/95",
        outline: "border-1 border-black text-black hover:bg-black hover:text-white",
    },
    branco:{
        fill: "bg-branco text-textoPrincipal hover:bg-branco/10 active:bg-branco/95",
        outline: "border-1 text-textoPrincipal hover:bg-branco/10 hover:text-textoPrincipal",
    },
    textoPrincipal:{
        fill: "bg-background text-textoPrincipal hover:bg-back/10 active:bg-textoPrincipal/95",
        outline: "border-1 border-textoPrincipal text-textoPrincipal hover:bg-textoPrincipal/10 hover:text-textoPrincipal",
    }
}

export default function Button({ rounded = "full", text, onClick, fill, color = "azulPrincipal", type = "submit", className }) {
    const variant = fill ? "fill" : "outline"
    const colorClass = colorMap[color]?.[variant] ?? colorMap.azulPrincipal[variant]

    return (
        <button
            onClick={onClick}
            type={type}
            className={`${colorClass} p-2 rounded-${rounded} shadow-md shadow-black/20  cursor-pointer transition-all duration-200 ${className}`}
        >
            {text}
        </button>
    )
}