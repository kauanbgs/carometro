import { Link } from 'react-router-dom';
import Text from '../../components/text';
import Button from '../../components/button';

export default function Page404() {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-background text-white">
            <Text color="azulPrincipal" className="text-6xl font-bold mb-4">404</Text>
            <Text variant="title" className="mb-2">Essa página não existe.</Text>
            <Text variant="text">A página procurada não existe ou foi removida. Se você acha que isso é um erro, favor contate o administrador.</Text>
            <Button text="Voltar" fill className="w-82 mt-6" onClick={() => window.history.back()}/>
        </div>
    );
};
