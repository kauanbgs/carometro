import SideBar from "../../components/sideBar";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Input from "../../components/input";
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

    const navigate = useNavigate()

    const onChange = (e) => {
        const { name, value } = e.target
        setUser({ ...user, [name]: value })
        console.log(user)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await api.postCadastro(user)
            alert(response.data.message)
            return navigate('/home')
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
                <div className="items-center justify-center flex">
                    <h1>VAI UM ALERT AQUI</h1>
                </div>
                <div className="flex flex-col items-center justify-center mt-10">
                    <h1 className="text-lg">Criando Docente</h1>
                    <form action="" onSubmit={handleSubmit} className="flex flex-col gap-4 w-[50%] mt-10">
                        <Input type="text" placeholder="Nome do docente" onChange={onChange} id="nome" name="nome" value={user.nome} />
                        <Input type="text" placeholder="Email" onChange={onChange} id="email" name="email" value={user.email} />
                        <Input type="password" placeholder="Senha" onChange={onChange} id="senha" name="senha" value={user.senha} />
                        <select id="tipo" name="tipo" value={user.tipo} onChange={onChange} className="p-2 h-12 rounded-lg text-sm border-1 border-zinc-300">
                            <option value="doc">doc</option>
                            <option value="adm">adm</option>
                        </select>

                        <button type="submit" className="bg-[var(--azulSecundario)] text-white p-2 rounded-lg mt-2">Adicionar</button>
                    </form>
                </div>
            </main>
        </div>
    )
}