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
import Text from "../../components/text";


export default function CadastroTemp() {

    const [user, setUser] = useState({
        email: "",
        password: "",
        name: "",
        type: ""
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
            const response = await api.postCadastroUser(user)
            setFeedback({ message: response.data.message, type: "success" })
            navigate("/")
        } catch (error) {
            const msgErro = error.response?.data?.error || "Erro ao conectar com o servidor."
            setFeedback({ message: msgErro, type: "error" })
        }
    }

    return (
        <div className="bg-back h-screen w-screen">
            <main className="flex-1 p-10 bg-background h-full rounded-l-3xl">

                <Alert
                    type={feedback.type}
                    message={feedback.message}
                    onClose={() => setFeedback({ message: "", type: "" })}
                />

                <div className="flex flex-col items-center justify-center mt-7">
                    <Text variant="subtitle">Criando Docente</Text>
                    <form action="" onSubmit={handleSubmit} className="flex flex-col gap-4 w-[50%] mt-3">
                        <Input type="text" placeholder="Nome do docente" onChange={onChange} id="name" name="name" value={user.name} />
                        <Input type="text" placeholder="Email" onChange={onChange} id="email" name="email" value={user.email} />
                        <Input type="password" placeholder="Senha" onChange={onChange} id="password" name="password" value={user.password} />
                        <select id="type" name="type" value={user.type} onChange={onChange} className="p-2 h-12 rounded-lg text-sm border-1 border-zinc-300">
                            <option value="inst">inst</option>
                            <option value="adm">adm</option>
                        </select>

                        <Button type="submit" text="Adicionar" color="azulPrincipal" fill={true} />   
                    </form>
                </div>
                <Link to="/">
                    <Button text="Voltar" color="azulPrincipal" fill={false} />
                </Link>
            </main>
        </div>
    )
}