export default function Input({type, placeholder, fill=false}) {
    return (
        <input type={type} placeholder={placeholder} className={`p-2 h-12 rounded-lg text-sm border-1 border-zinc-300 ${fill ? "bg-zinc-100" : ""}`}/>
    )
}