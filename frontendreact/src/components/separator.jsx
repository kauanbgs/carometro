export default function Separator({ horizontal = false }) {
    return (
        <div className={`bg-black/50 block mx-5 ${horizontal ? "w-full h-[1px]" : "w-[1px] self-stretch"}`}></div>
    )
}