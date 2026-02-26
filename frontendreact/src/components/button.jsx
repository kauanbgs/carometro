export default function Button({text}) {
    return (
        <button className="bg-[var(--azulPrincipal)] text-white p-2 rounded-full w-full" type="submit">{text}</button>
    )
}