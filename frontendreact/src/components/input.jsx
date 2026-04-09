export default function Input({ type, placeholder, fill = false, onChange, name, value, id }) {
    return (
        <input type={type} placeholder={placeholder} onChange={onChange} name={name} value={value} id={id}
            className={`p-2 h-12 rounded-lg text-sm border-1 border-zinc-300 ${fill ? "bg-zinc-100" : ""}
        focus:outline-none focus:border-[var(--azulPrincipal)]`} />
    )
}