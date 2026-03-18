import { House, UsersRound, GraduationCap, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import Text from './text';


export default function SideBar({ items }) {
    return (
        <div className="w-[20%] bg-[var(--background)] border-r border-gray-200 flex flex-col h-screen fixed left-0 top-0 rounded-r-3xl">
            <header className="flex items-center justify-center p-4">
                <img src="/LogoCarometro-v2.png" alt="" className="w-42 mt-5 " />
            </header>
            <main className="flex flex-col gap-2 mt-4 p-4">
                {items.map((item, index) => {
                    const Icon = item.icon;

                    return (
                        <div key={index} className="items-center gap-2 mb-5">
                            <Text variant="text" color="azulPrincipal" className="text-center mb-3 font-semibold uppercase">{item.dad}</Text>
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