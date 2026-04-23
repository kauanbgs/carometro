import { Mail, Phone } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Suporte() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full bg-background relative flex flex-col font-['Montserrat'] overflow-x-hidden">
      <div className="absolute top-10 left-10 md:top-14 md:left-14">
        <img
          src="/LogoCarometro-v2.png"
          alt="Carometro"
          className="h-12 md:h-16"
        />
      </div>

      <div className="flex-1 flex flex-col lg:flex-row items-center justify-center max-w-[1300px] w-full mx-auto px-6 py-28 lg:py-0 gap-10 lg:gap-0">
        <div className="w-full lg:w-1/2 flex flex-col items-center justify-center h-full">
          <h1 className="text-azulPrincipal text-3xl md:text-4xl font-bold text-center leading-tight mb-5">
            Como podemos
            <br />
            ajudar?
          </h1>

          <p className="text-textoPrincipal text-center text-[17px] md:text-lg mb-12 max-w-[400px]">
            Nosso suporte está disponível 24h para
            <br className="hidden md:block" /> registro e edição de contas
          </p>

          <div className="flex flex-col gap-5 mb-16 self-center lg:-ml-12 w-full max-w-[320px]">
            <div className="flex items-center gap-5">
              <div className="w-12 h-12 bg-[#5179B6] rounded-xl flex items-center justify-center text-white shrink-0 shadow-sm">
                <Mail className="w-[22px] h-[22px]" />
              </div>
              <span className="text-textoPrincipal text-[17px] font-medium tracking-wide">
                meuemailadm@gmail.com
              </span>
            </div>

            <div className="flex items-center gap-5">
              <div className="w-12 h-12 bg-[#5179B6] rounded-xl flex items-center justify-center text-white shrink-0 shadow-sm">
                <Phone className="w-[22px] h-[22px]" />
              </div>
              <span className="text-textoPrincipal text-[17px] font-medium tracking-wide">
                +99 (99)99999-9999
              </span>
            </div>
          </div>

          <button
            onClick={() => navigate(-1)}
            className="w-full max-w-[360px] bg-azulPrincipal text-white py-3.5 rounded-full font-medium text-[17px] hover:bg-blue-800 transition-colors shadow-md"
          >
            Voltar
          </button>
        </div>

        <div className="hidden lg:block w-[1.5px] h-[60vh] bg-[#C1C1C1] mx-4"></div>

        <div className="w-full lg:w-1/2 flex flex-col justify-center h-full pl-0 lg:pl-16 max-w-[650px] mx-auto">
          <h1 className="text-azulPrincipal text-3xl md:text-4xl font-bold text-center leading-tight mb-10">
            Dúvidas
            <br />
            Frequentes
          </h1>

          <ul className="flex flex-col gap-6 text-textoPrincipal text-[15px] leading-relaxed font-medium">
            <li className="flex items-start gap-2.5">
              <div className="w-[5px] h-[5px] bg-textoPrincipal rounded-full mt-2.5 shrink-0"></div>
              <p>
                Não é possível se registrar sozinho(a) no Carômetro de Franca,
                SP. Procure um administrador nos contatos ao lado!
              </p>
            </li>
            <li className="flex items-start gap-2.5">
              <div className="w-[5px] h-[5px] bg-textoPrincipal rounded-full mt-2.5 shrink-0"></div>
              <p>
                O sistema é totalmente online e não depende de instalar nenhum
                aplicativo. Basta ter acesso à internet e um navegador
                atualizado para utilizar.
              </p>
            </li>
            <li className="flex items-start gap-2.5">
              <div className="w-[5px] h-[5px] bg-textoPrincipal rounded-full mt-2.5 shrink-0"></div>
              <p>
                O uso do sistema é exclusivo da escola. Isso significa que
                somente professores e gestores autorizados pelo administrador
                poderão acessar as informações.
              </p>
            </li>
            <li className="flex items-start gap-2.5">
              <div className="w-[5px] h-[5px] bg-textoPrincipal rounded-full mt-2.5 shrink-0"></div>
              <p>
                Alterações de informações sensíveis, como o e-mail de login ou o
                tipo de permissão de acesso, só podem ser realizadas pelo
                administrador.
              </p>
            </li>
            <li className="flex items-start gap-2.5">
              <div className="w-[5px] h-[5px] bg-textoPrincipal rounded-full mt-2.5 shrink-0"></div>
              <p>
                Se você tiver qualquer dificuldade para acessar, o primeiro
                passo é falar com o administrador da sua escola. Caso seja
                necessário suporte técnico, ele fará o encaminhamento para a
                equipe responsável.
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
