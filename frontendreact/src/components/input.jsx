export default function Input({ label = false, type, placeholder, fill = false, onChange, name, value, id, className, width, ...props }) {
    return (
        <div className="flex flex-col">
            {label && <label htmlFor={id} className="text-textoPrincipal text-sm">{label}</label>}
            <input type={type} placeholder={placeholder} onChange={onChange} name={name} value={value} id={id}
                className={`${className} p-2 h-12 rounded-lg text-sm text-textoPrincipal border border-zinc-300 ${fill ? "bg-back border-background/20" : ""}
        focus:outline-none focus:border-azulPrincipal ${width ? width : ""}`} {...props} />
        </div>
    )
}