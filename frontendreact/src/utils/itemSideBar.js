import { House, UsersRound, GraduationCap, Shield } from 'lucide-react';

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
        icon: Shield,
        dad: "Dev",
        label: "Gerenciar Desenvolvedores",
        to: "/gerenciarDesenvolvedores"
    }
];

export default items;