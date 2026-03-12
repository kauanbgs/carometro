export default function Button({text}) {
    return (
        <button 
        className="bg-[var(--azulPrincipal)] text-white p-2 rounded-full w-full
        cursor-pointer
        hover:bg-[var(--azulPrincipal)]/85
        active:bg-[var(--azulPrincipal)]/95
        transition-all duration-200
        " type="submit">{text}</button>
    )
}