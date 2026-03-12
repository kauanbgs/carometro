// import { House, UsersRound, GraduationCap, Shield } from 'lucide-react';
// import { Link } from 'react-router-dom';


// export default function SideBar() {
//     return (
//         <div className="w-[20%] bg-white border-r border-gray-200 flex flex-col h-screen fixed left-0 top-0 rounded-r-3xl">
//             <header className="flex items-center justify-center p-4">
//                 <img src="/SenaiLogo.png" alt="" className="w-42 mt-5 " />
//             </header>
//             <main className="flex flex-col gap-2 mt-12 p-4">
//                 <div className="flex items-center gap-2">
//                     <House />
//                     <Link to="/home" className="text-sm">Inicio</Link>
//                 </div>
//                 <hr className="border-t-1 border-gray-800 mt-5 w-[85%] self-center" />
//                 <h1 className="text-sm self-center text-blue-400 font-semibold mt-3">ALUNOS</h1>
//                 <div className="flex items-center gap-2">
//                     <UsersRound />
//                     <h1 className="text-sm">Gerenciar Turmas</h1>
//                 </div>
//                 <hr className="border-t-1 border-gray-800 mt-5 w-[85%] self-center" />
//                 <h1 className="text-sm self-center text-blue-400 font-semibold mt-3">DOCENTES</h1>
//                 <div className="flex items-center gap-2">
//                     <GraduationCap />
//                     <Link to="/gerenciarDocentes" className="text-sm">Gerenciar Docentes</Link>
//                 </div>
//                 <hr className="border-t-1 border-gray-800 mt-5 w-[85%] self-center" />

//                 <h1 className="text-sm self-center text-blue-400 font-semibold mt-3">DEV</h1>
//                 <div className="flex items-center gap-2">
//                     <Shield />
//                     <h1 className="text-sm">Gerenciar Desenvolvedores</h1>
//                 </div>
//             </main>
//         </div>
//     )
// }

import { House, UsersRound, GraduationCap, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';


export default function SideBar({ items }) {
    return (
        <div className="w-[20%] bg-[var(--background)] border-r border-gray-200 flex flex-col h-screen fixed left-0 top-0 rounded-r-3xl">
            <header className="flex items-center justify-center p-4">
                <img src="/SenaiLogo.png" alt="" className="w-42 mt-5 " />
            </header>
            <main className="flex flex-col gap-2 mt-4 p-4">
                {items.map((item, index) => {
                    const Icon = item.icon;

                    return (
                        <div key={index} className="items-center gap-2 mb-5">
                            <h1 className="text-center text-sm text-[var(--azulPrincipal)] font-semibold mb-3 uppercase">{item.dad}</h1>
                            <div className="flex items-center gap-2">
                                <Icon />
                                <Link to={item.to} className="text-sm">{item.label}</Link>
                            </div>
                            {index !== items.length - 1 && (
                                <hr className="self-center ml-4 border-t-1 border-gray-800 mt-5 w-[85%]" />
                            )}
                        </div>
                    );
                })}
            </main>
        </div>
    )
}