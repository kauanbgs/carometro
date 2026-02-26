import "../index.css"
import Button from "../components/button"
import Input from "../components/input"

export default function Login() {
  return (
    <div className="bg-[url('/FundoLogin.png')] bg-cover bg-center min-h-screen items-center flex align-center justify-center flex-col">
      <main className="w-[31%] bg-white rounded-lg items-center align-center justify-center h-[500px]">
        <div className="flex flex-col items-center justify-center p-10">
        <img src="/SenaiLogo.png" alt="" className="w-32"/>
        </div>
        <form action="" className="flex flex-col p-6">
          <div className="flex flex-col mb-3">
          <h1 className="text-sm">Email</h1>
          <Input type="text" placeholder="kauanbgs13@gmail.com" fill/>
          </div>
          <div className="flex flex-col mb-6">
          <h1 className="text-sm">Senha</h1>
          <Input type="password" placeholder="Senha" fill/>
          </div>
          <Button text="Entrar"/>
        </form>
        <div className="flex flex-col items-center justify-center p-6">
          <h1 className="text-sm">Esqueceu sua senha? <a href="#" className="text-[var(--azulPrincipal)]">Recuperar senha</a></h1>
        </div>
        <div className="flex flex-col items-center justify-center p-6">
          <h1 className="text-sm">Não tem uma conta? <a href="#" className="text-[var(--azulPrincipal)]">Cadastre-se</a></h1>
        </div>
      </main>
    </div>
  );
}