import SideBar from "../../components/sideBar";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Input from "../../components/input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../axios/axios";
import items from "../../utils/itemSideBar";


export default function RemoverDocente() {

    const [user, setUser] = useState({
        email: "",
        senha: ""
    })

    const navigate = useNavigate()

    const onChange = (e) => {
        const { name, value } = e.target
        setUser({ ...user, [name]: value })
        console.log(user)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await api.deleteDocente(user)
            alert(response.data.message)
            return navigate('/gerenciarDocentes')
        } catch (error) {
            alert(error.response.data.error)
        }
    }
    return (
        <div className="bg-[var(--back)] h-screen w-screen">
            <SideBar items={items} />
            <main className="flex-1 w-78%] ml-[22%] p-10 bg-[var(--background)] h-full rounded-l-3xl">
                <div className="flex gap-2">
                    <Link className="flex gap-2" to="/gerenciarDocentes"> <ArrowLeft /> Voltar</Link>
                </div>
                <div className="flex flex-col items-center justify-center mt-10">
                    <h1 className="text-lg">Excluir Docente</h1>
                    <form action="" onSubmit={handleSubmit} className="flex flex-col gap-4 w-[50%] mt-10">
                        <Input type="text" placeholder="Email do Docente" onChange={onChange} id="email" name="email" value={user.email} />
                        <Input type="text" placeholder="Senha do Docente" onChange={onChange} id="senha" name="senha" value={user.senha} />

                        <button type="submit" className="bg-[var(--erro)] text-white p-2 rounded-lg mt-2">Excluir</button>
                    </form>
                </div>
            </main>
        </div>
    )
}