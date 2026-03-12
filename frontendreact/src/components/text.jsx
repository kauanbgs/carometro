const variants = {
    title: "text-xl font-semibold",
    subtitle: "text-lg font-normal",
    text: "text-sm font-normal",
}

const colorMap = {
    azulPrincipal: "text-[var(--azulPrincipal)]",
    azulSecundario: "text-[var(--azulSecundario)]",
    erro: "text-[var(--erro)]",
    sucesso: "text-[var(--sucesso)]",
    branco: "text-white",
    preto: "text-black",
}

export default function Text({ variant, children, color = 'preto', className = "" }) {
    return (
        <p className={`${variants[variant]} ${colorMap[color]} ${className}`}>
            {children}
        </p>
    )
}