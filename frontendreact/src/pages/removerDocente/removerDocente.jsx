import SideBar from "../../components/sideBar";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Input from "../../components/input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../axios/axios";
import items from "../../utils/itemSideBar";
import Alert from "../../components/alert";
import Text from "../../components/text";


export default function RemoverDocente() {

    const [user, setUser] = useState({
        email: "",
        senha: ""
    })

    const navigate = useNavigate()

    const [feedback, setFeedback] = useState({ message: "", type: "" })

    const onChange = (e) => {
        const { name, value } = e.target
        setUser({ ...user, [name]: value })
        console.log(user)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await api.deleteDocente(user)
            setFeedback({ message: response.data.message, type: "success" })
        } catch (error) {
            setFeedback({ message: error.response.data.error, type: "error" })
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
                    <Text variant="subtitle">Excluir Docente</Text>
                    <form action="" onSubmit={handleSubmit} className="flex flex-col gap-4 w-[50%] mt-3">
                        <Input type="text" placeholder="Email do Docente" onChange={onChange} id="email" name="email" value={user.email} />
                        <Input type="text" placeholder="Senha do Docente" onChange={onChange} id="senha" name="senha" value={user.senha} />

                        <button type="submit" className="bg-[var(--erro)] text-white p-2 rounded-lg mt-2">Excluir</button>
                    </form>
                </div>
            </main>
        </div>
    )
}