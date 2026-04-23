import { House, UsersRound, GraduationCap, Shield, User, LogOut, Moon, Sun } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Text from './text';
import { useState } from 'react';

export default function SideBar({ items }) {

    const toggleTheme = () => {
        const html = document.documentElement;
        html.classList.toggle('dark');
        localStorage.setItem('theme', html.classList.contains('dark') ? 'dark' : 'light');
    };

    const [showLogout, setShowLogout] = useState(false);
    const navigate = useNavigate();

    return (
        <div className="w-16 md:w-[22%] lg:w-[20%] bg-background flex flex-col h-screen fixed left-0 top-0 md:rounded-r-3xl z-50">
            <header className="flex items-center justify-center p-4">
                <img src="/LogoCarometro-v2.png" alt="" className="hidden md:block w-32 lg:w-42 mt-5 object-contain" />
                <img src="/LogoCarometro-v2.png" alt="" className="md:hidden w-8 h-8 mt-2 object-cover object-left" style={{ objectFit: 'cover', objectPosition: 'left' }} />
            </header>
            <main className="flex flex-col gap-2 mt-4 p-2 md:p-4 overflow-y-auto flex-1 scrollbar-hide">
                {items.map((item, index) => {
                    const Icon = item.icon;

                    return (
                        <div key={index} className="flex flex-col items-center md:items-start gap-2 mb-5">
                            <Text variant="text" color="azulPrincipal" className="hidden md:block text-center mb-3 font-semibold uppercase">{item.dad}</Text>
                            <Link to={item.to} className="flex items-center justify-center md:justify-start gap-2 w-full truncate group hover:text-azulPrincipal transition-colors duration-200">
                                <Icon className="w-6 h-6 shrink-0 text-textoPrincipal group-hover:text-azulPrincipal transition-colors duration-200" />
                                <Text className="hidden text- md:block text-sm truncate group-hover:text-azulPrincipal transition-colors duration-200">{item.label}</Text>
                            </Link>
                            {index !== items.length - 1 && (
                                <hr className="hidden md:block self-center ml-4 mt-5 w-[85%]" />
                            )}
                        </div>
                    );
                })}
            </main>

            <div className="mt-auto p-4 relative bg-background z-50">
                {showLogout && (
                    <div className="absolute bottom-full mb-2 left-2 md:left-4 right-2 md:right-4 bg-background shadow-md rounded-xl p-2 flex flex-col gap-1 border border-zinc-100 dark:border-zinc-800">
                        <div 
                            className="flex items-center justify-center md:justify-start gap-2 p-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-zinc-800 rounded-lg transition-colors"
                            onClick={toggleTheme}
                        >
                            <Moon className="w-5 h-5 text-azulPrincipal shrink-0 block dark:hidden" />
                            <Sun className="w-5 h-5 text-yellow-500 shrink-0 hidden dark:block" />
                            <Text variant="text" className="font-medium hidden md:block">Trocar Tema</Text>
                        </div>

                        <hr className="border-zinc-100 dark:border-zinc-800" />

                        <div 
                            className="flex items-center justify-center md:justify-start gap-2 p-3 cursor-pointer hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                            onClick={() => {
                                localStorage.removeItem("token");
                                localStorage.removeItem("user");
                                navigate("/");
                                window.location.reload();
                            }}
                        >
                            <LogOut className="w-5 h-5 text-red-500 shrink-0" />
                            <Text variant="text" className="text-red-500 font-medium hidden md:block">Sair da conta</Text>
                        </div>
                    </div>
                )}
                
                <div 
                    className="flex justify-center md:justify-start items-center gap-3 cursor-pointer p-2 -m-2 rounded-lg"
                    onClick={() => setShowLogout(!showLogout)}
                >
                    <div className="w-10 h-10 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-gray-500" />
                    </div>
                    <div className="hidden md:flex flex-col truncate">
                        <Text variant="text" className="font-semibold text-sm truncate">{JSON.parse(localStorage.getItem("user")).name}</Text>
                        <Text variant="text" className="text-xs text-gray-500 truncate">{JSON.parse(localStorage.getItem("user")).email}</Text>
                    </div>
                </div>
            </div>
        </div>
    )
}