import "../index.css";
import Button from "../components/button.jsx";
import Input from "../components/input.jsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../axios/axios.js";
import Text from "../components/text.jsx";
import { Link } from "react-router-dom";
import { Snackbar } from "../components/snackbar.jsx";


export default function Login() {
  const navigate = useNavigate();

  if (localStorage.getItem("token")) {
    navigate("/home");
  }
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [snackbar, setSnackbar] = useState({ message: "", type: "" });

  const onChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    console.log(user);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSnackbar({ message: "", type: "" });
    try {
      const response = await api.postLogin(user);
      setSnackbar({
        message: response.data.message || "Successful login",
        type: "success"
      });
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.instructor));
      navigate("/home");
      window.location.reload();
    } catch (error) {
      const msgErro =
        error.response.data.error || "Internal Server Error";
      setSnackbar({ message: msgErro, type: "error" });
    }
  };

  return (
    <div className="bg-[url('/FundoLogin.png')] bg-cover bg-center min-h-screen items-center flex align-center justify-center flex-col">
      <Snackbar
        isOpen={snackbar.message !== ""}
        message={snackbar.message}
        type={snackbar.type}
        onClose={() => setSnackbar({ message: "", type: "" })}
      />
      <main className="w-[31%] bg-back rounded-lg items-center align-center justify-center min-h-125 w-[80%] max-w-105">
        <div className="flex flex-col items-center justify-center p-10">
          <img src="/LogoCarometro-v2.png" alt="" className="w-48" />
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col p-6">
          <div className="flex flex-col mb-3 ">
            <Text variant="text">Email</Text>
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
            <Text variant="text">Senha</Text>
            <Input
              type="password"
              placeholder="Senhaboa123!"
              fill
              
              onChange={onChange}
              id="password"
              name="password"
              value={user.password}
            />
          </div>
          <Button type="submit" text="Entrar" fill className="w-full" />
          <Text variant="text" className="mt-4">
            Esqueceu sua senha?{" "}
            <Link to="/suporte" className="text-azulPrincipal cursor-pointer hover:underline">
              Recuperar senha
            </Link>
          </Text>
        </form>
        <div className="flex flex-col p-7 justify-center items-center gap-12">
          <Text variant="text" className="text-sm mt-8 ">
            Não tem uma conta?{" "}
            <Link to="/suporte" className="text-azulPrincipal cursor-pointer hover:underline">
              Cadastre-se
            </Link>
            <Link to="/cadastrotemp" className="text-azulPrincipal cursor-pointer hover:underline">
              TEMPORARIO PRA TESTES
            </Link>
          </Text>
        </div>
      </main>
    </div>
  );
}
