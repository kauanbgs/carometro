import "../index.css"

export default function Login() {
  return (
    <div className="bg-[url('/FundoLogin.png')] bg-cover bg-center min-h-screen items-center flex align-center justify-center flex-col">
      <main className="text-[var(--preto)] border-2 border-blue-500  w-[31%] bg-[var(--back)] rounded-xl items-center align-center justify-center">
        <header>
            <img className="w-48" src="/SenaiLogo.png"/>
        </header>

        <div className="text-black bg-amber-800 ">
            <input type="text" />
            <input type="text" />
        </div>

        <footer>

        </footer>
      </main>
    </div>
  );
}