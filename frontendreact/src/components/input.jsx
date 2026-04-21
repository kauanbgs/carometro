export default function Input({ label=false, type, placeholder, fill = false, onChange, name, value, id, className, width }) {
    return (
        <div className="flex flex-col">
        {label && <label htmlFor={id} className="text-zinc-500 text-sm">{label}</label>}
        <input type={type} placeholder={placeholder} onChange={onChange} name={name} value={value} id={id}
            className={`p-2 h-12 rounded-lg text-sm border-1 border-zinc-300 ${fill ? "bg-zinc-100" : ""}
        focus:outline-none focus:border-[var(--azulPrincipal)] ${className} ${width ? width : ""}`} />
        </div>
    )
}