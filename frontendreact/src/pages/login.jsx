import "../index.css";
import Button from "../components/button.jsx";
import Input from "../components/input.jsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../axios/axios.js";

export default function Login() {
  const [user, setUser] = useState({
    email: "",
    senha: "",
  });

  const [feedback, setFeedback] = useState({ message: "", type: "" });

  const navigate = useNavigate();

  const onChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    console.log(user);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFeedback({ message: "", type: "" });
    try {
      const response = await api.postLogin(user);
      setFeedback({
        message: response.data.message || "Login realizado com sucesso!",
        type: "success"
      });
      setTimeout(() => navigate("/home"), 1500); // Vai deixa o usuário ver a mensagem por 1,5seg
    } catch (error) {
      const msgErro =
        error.response.data.error || "Erro ao conectar com o servidor.";
      setFeedback({ message: msgErro, type: "error" });
    }
  };

  return (
    <div className="bg-[url('/FundoLogin.png')] bg-cover bg-center min-h-screen items-center flex align-center justify-center flex-col">
      {feedback.message && (
        <div
          className={`absolute top-0 mt-6 w-[28%] p-4 text-center text-white font-medium transition-all duration-500 rounded-full ${
            feedback.type === "success" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {feedback.message}
        </div>
      )}
      <main className="w-[31%] bg-white rounded-lg items-center align-center justify-center min-h-125 w-[80%] max-w-105">
        <div className="flex flex-col items-center justify-center p-10">
          <img src="/SenaiLogo.png" alt="" className="w-32" />
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col p-6">
          <div className="flex flex-col mb-3">
            <h1 className="text-sm">Email</h1>
            <Input
              type="text"
              placeholder="Kauanbgs13@gmail.com"
              fill
              onChange={onChange}
              id="email"
              name="email"
              value={user.email}
            />
          </div>
          <div className="flex flex-col mb-6">
            <h1 className="text-sm">Senha</h1>
            <Input
              type="password"
              placeholder="Senha"
              fill
              onChange={onChange}
              id="senha"
              name="senha"
              value={user.senha}
            />
          </div>
          <Button type="submit" text="Entrar" />
          <h1 className="text-sm mt-2">
            Esqueceu sua senha?{" "}
            <a href="#" className="text-[var(--azulPrincipal)]">
              Recuperar senha
            </a>
          </h1>
        </form>
        <div className="flex flex-col p-7 justify-center items-center gap-12">
          <h1 className="text-sm mt-8 ">
            Não tem uma conta?{" "}
            <a href="#" className="text-[var(--azulPrincipal)]">
              Cadastre-se
            </a>
          </h1>
        </div>
      </main>
    </div>
  );
}
