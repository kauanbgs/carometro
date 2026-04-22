import { House, UsersRound, GraduationCap, Globe } from 'lucide-react';

const items = [
    {
        icon: House,
        label: "Inicio",
        to: "/home"
    },
    {
        icon: UsersRound,
        dad: "Alunos",
        label: "Gerenciar Turmas",
        to: "/editarTurma"
    },
    {
        icon: GraduationCap,
        dad: "Docentes",
        label: "Gerenciar Docentes",
        to: "/gerenciarDocentes"
    },
    {
        icon: Globe,
        dad: "Conexões",
        label: "Conectar-se ao Google",
        to: "/conexoes"
    }

];

export default items;