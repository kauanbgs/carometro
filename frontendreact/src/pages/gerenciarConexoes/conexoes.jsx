import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Snackbar } from "../../components/snackbar";
import SideBar from "../../components/sideBar";
import items from "../../utils/itemSideBar";
import Text from "../../components/text";
import api from "../../axios/axios";
import { Globe, GraduationCap, Link2, Unlink, CheckCircle2 } from "lucide-react";
import { useLocation } from "react-router-dom";

export default function Conexoes() {
    const location = useLocation();

    
    const [searchParams] = useSearchParams();
    const [snackbar, setSnackbar] = useState({ message: "", type: "" });
    const [isLoading, setIsLoading] = useState(false);
    const [isConnected, setIsConnected] = useState(false);
    const [isChecking, setIsChecking] = useState(true);

    const user = JSON.parse(localStorage.getItem("user"));

    // Verifica se já está conectado ao carregar a página
    useEffect(() => {
        const { snackbar: stateSnackbar } = location.state || {};
        
        if (stateSnackbar) {
            setSnackbar({ message: stateSnackbar, type: "error" });
            location.state = null;
            console.log(location)
        }
        
        if (user && user.id_instructor) {
            api.getClassesGoogle(user.id_instructor)
                .then(() => {
                    setIsConnected(true);
                })
                .catch(() => {
                    setIsConnected(false);
                })
                .finally(() => {
                    setIsChecking(false);
                });
        } else {
            setIsChecking(false);
        }
    }, []);

    useEffect(() => {
        if (searchParams.get("success")) {
            setSnackbar({ message: "Google Classroom conectado com sucesso!", type: "success" });
            setIsConnected(true);
        } else if (searchParams.get("error")) {
            setSnackbar({ message: "Erro ao conectar com o Google Classroom.", type: "error" });
        }
    }, [searchParams]);

    const handleGoogleAuth = () => {
        if (user && user.id_instructor) {
            window.location.href = `http://localhost:5000/sigo/auth/google?id_instructor=${user.id_instructor}`;
        } else {
            setSnackbar({ message: "Você precisa estar logado para conectar!", type: "error" });
        }
    }

    const handleLogout = () => {
        setIsLoading(true);
        api.postDisconnectGoogle(user.id_instructor).then((res) => {
            setSnackbar({ message: res.data.message || "Desconectado com sucesso!", type: "success" });
            setIsConnected(false);
        }).catch((err) => {
            setSnackbar({ message: err.response?.data?.error || "Erro ao desconectar.", type: "error" });
        }).finally(() => {
            setIsLoading(false);
        });
    }

    return (
        <div className="h-screen w-full bg-back flex overflow-hidden font-sans">
            <SideBar items={items} />
            <main className="flex-1 ml-16 md:ml-[22%] p-6 md:p-12 overflow-y-auto bg-background rounded-l-3xl flex flex-col items-center">

                <Snackbar
                    isOpen={snackbar.message !== ""}
                    message={snackbar.message}
                    type={snackbar.type}
                    onClose={() => setSnackbar({ message: "", type: "" })}
                />
                
                <div className="w-full max-w-5xl mt-4">
                    <div className="flex items-center gap-3 mb-2">
                        <Text variant="megaTitle" className="text-3xl md:text-4xl lg:text-5xl">Conexões</Text>
                    </div>
                    <Text variant="text" className="text-gray-500 mb-10 text-lg">
                        Conecte suas contas para puxar turmas e alunos automaticamente e poupar trabalho.
                    </Text>
                    
                    <div className="bg-white rounded-2xl  p-8 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden group">
                        

                        <div className="flex items-center gap-6 z-10 w-full md:w-auto">
                            <div className="w-20 h-20 rounded-2xl flex items-center justify-center flex-shrink-0 relative">
                                <img 
                                    src="/classroomlogo.png" 
                                    alt="Google Classroom" 
                                    className="w-20 h-20 object-contain" 
                                />
                            </div>
                            <div className="flex flex-col">
                                <div className="flex items-center gap-3">
                                    <Text variant="title" className="text-2xl text-gray-800">Google Classroom</Text>
                                    {isConnected && !isChecking && (
                                        <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-full uppercase tracking-wide">
                                            Conectado
                                        </span>
                                    )}
                                </div>
                                <Text variant="text" className="text-gray-500 text-sm mt-1 max-w-md">
                                    Vincule sua conta do Google para puxar todas as suas turmas e alunos do Classroom direto pro sistema.
                                </Text>
                            </div>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto z-10">
                            {!isChecking && (
                                <>
                                    {!isConnected ? (
                                        <button 
                                            onClick={handleGoogleAuth}
                                            className="flex items-center justify-center gap-2 px-6 py-3 bg-azulPrincipal hover:bg-blue-700 text-white rounded-xl font-medium transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                        >
                                            <Link2 className="w-5 h-5" />
                                            <span>Conectar Conta</span>
                                        </button>
                                    ) : (
                                        <button 
                                            onClick={handleLogout}
                                            disabled={isLoading}
                                            className="flex items-center justify-center gap-2 px-6 py-3 bg-white border border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 rounded-xl font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            <Unlink className="w-5 h-5" />
                                            <span>{isLoading ? "Aguarde..." : "Desconectar"}</span>
                                        </button>
                                    )}
                                </>
                            )}
                            
                            {isChecking && (
                                <div className="text-gray-400 text-sm flex items-center gap-2">
                                    <div className="w-4 h-4 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
                                    Verificando...
                                </div>
                            )}
                        </div>
                    </div>
                  
                </div>
            </main>
        </div>
    );
}
