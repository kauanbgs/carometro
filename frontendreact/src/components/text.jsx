const variants = {
    megaTitle: "text-3xl font-normal",
    title: "text-xl font-semibold",
    subtitle: "text-lg font-normal",
    text: "text-sm font-normal",
}

const colorMap = {
    azulPrincipal: "text-azulPrincipal",
    azulSecundario: "text-azulSecundario",
    erro: "text-erro",
    sucesso: "text-sucesso",
    branco: "text-white",
    preto: "text-black",
    textoPrincipal: "text-textoPrincipal",
    textoSecundario: "text-textoSecundario",
}

export default function Text({ variant, children, color = 'textoPrincipal', className = "" }) {
    return (
        <p className={`${className} ${variants[variant]} ${colorMap[color]}`}>
            {children}
        </p>
    )
}