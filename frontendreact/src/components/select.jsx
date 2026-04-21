export default function Select({ fill = false, onChange, name, value, id, className, width, children }) {
    return (
        <select onChange={onChange} name={name} value={value} id={id}
            className={`p-2 h-12 rounded-lg text-sm border-1 border-zinc-300 ${fill ? "bg-zinc-100" : ""}
        focus:outline-none focus:border-[var(--azulPrincipal)] ${className} ${width ? width : ""}`} >
            {children}
        </select>
    )
}