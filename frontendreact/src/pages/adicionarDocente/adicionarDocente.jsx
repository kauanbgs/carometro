import SideBar from "../../components/sideBar";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Input from "../../components/input";
import Alert from "../../components/alert";
import Button from "../../components/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../axios/axios";
import items from "../../utils/itemSideBar";


export default function AdicionarDocente() {

    const [user, setUser] = useState({
        email: "",
        senha: "",
        nome: "",
        tipo: ""
    })

    const [feedback, setFeedback] = useState({ message: "", type: "" })

    const navigate = useNavigate()

    const onChange = (e) => {
        const { name, value } = e.target
        setUser({ ...user, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setFeedback({ message: "", type: "" })
        try {
            const response = await api.postCadastro(user)
            setFeedback({ message: response.data.message, type: "success" })
        } catch (error) {
            const msgErro = error.response?.data?.error || "Erro ao conectar com o servidor."
            setFeedback({ message: msgErro, type: "error" })
        }
    }

    return (
        <div className="bg-[var(--back)] h-screen w-screen">
            <SideBar items={items} />
            <main className="flex-1 w-78%] ml-[22%] p-10 bg-[var(--background)] h-full rounded-l-3xl">
                <div className="flex gap-2">
                    <Link className="flex gap-2" to="/gerenciarDocentes"> <ArrowLeft /> Voltar</Link>
                </div>

                <Alert
                    type={feedback.type}
                    message={feedback.message}
                    onClose={() => setFeedback({ message: "", type: "" })}
                />

                <div className="flex flex-col items-center justify-center mt-7">
                    <h1 className="text-lg">Criando Docente</h1>
                    <form action="" onSubmit={handleSubmit} className="flex flex-col gap-4 w-[50%] mt-3">
                        <Input type="text" placeholder="Nome do docente" onChange={onChange} id="nome" name="nome" value={user.nome} />
                        <Input type="text" placeholder="Email" onChange={onChange} id="email" name="email" value={user.email} />
                        <Input type="password" placeholder="Senha" onChange={onChange} id="senha" name="senha" value={user.senha} />
                        <select id="tipo" name="tipo" value={user.tipo} onChange={onChange} className="p-2 h-12 rounded-lg text-sm border-1 border-zinc-300">
                            <option value="doc">doc</option>
                            <option value="adm">adm</option>
                        </select>

                        <Button type="submit" text="Adicionar" color="azulPrincipal" fill={true} />   
                    </form>
                </div>
            </main>
        </div>
    )
}