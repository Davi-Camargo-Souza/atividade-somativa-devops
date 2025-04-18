import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../Firebase';
import './index.css';

function Cadastro() {
  const [modalAberto, setModalAberto] = useState(false);
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [mensagem, setMensagem] = useState('');
  const navigate = useNavigate();

  const handleCadastro = async (e) => {
    e.preventDefault();
    
    if (senha !== confirmarSenha) {
      setMensagem('As senhas não coincidem!');
      return;
    }

    try {
      await auth.createUserWithEmailAndPassword(email, senha);
      setModalAberto(true);
    } catch (error) {
      const errorCode = error.code;
      
      if (errorCode === 'auth/email-already-in-use') {
        setMensagem('Este e-mail já está cadastrado!');
      } else if (errorCode === 'auth/invalid-email') {
        setMensagem('E-mail inválido!');
      } else if (errorCode === 'auth/weak-password') {
        setMensagem('Senha muito fraca (mínimo 6 caracteres)!');
      } else {
        setMensagem('Erro ao cadastrar: ' + error.message);
      }
    }
  };

  {modalAberto && (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-sm w-full text-center animate-fade-in">
        <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-2">Cadastro realizado!</h3>
        <p className="text-gray-700 dark:text-gray-300 mb-4">Sua conta foi criada com sucesso.</p>
        <button 
          onClick={() => {
            setModalAberto(false);
            navigate("/principal");
          }}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors dark:bg-blue-500 dark:hover:bg-blue-600"
        >
          Ir para o sistema
        </button>
      </div>
    </div>
  )}
  

  return (
    <>
      {modalAberto && (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-sm w-full text-center animate-fade-in">
        <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-2">Cadastro realizado!</h3>
        <p className="text-gray-700 dark:text-gray-300 mb-4">Sua conta foi criada com sucesso.</p>
        <button 
          onClick={() => {
            setModalAberto(false);
            navigate("/principal");
          }}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors dark:bg-blue-500 dark:hover:bg-blue-600"
        >
          Ir para o sistema
        </button>
      </div>
    </div>
  )}
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 space-y-6">
        <h2 className="text-3xl font-bold text-center text-blue-600 dark:text-blue-400">Cadastre-se</h2>
        <p className="text-center text-gray-600 dark:text-gray-300">Crie uma conta para acessar o sistema</p>

        {mensagem && (
          <div className="text-center text-red-500 dark:text-red-400">
            {mensagem}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleCadastro}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              placeholder="Insira seu email" 
              className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white" 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="relative">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Senha</label>
            <input 
              type="password" 
              id="password" 
              name="password" 
              placeholder="Crie uma senha (mínimo 6 caracteres)" 
              className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white" 
              required 
              minLength="6"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
            <span className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer">
              <i className="fas fa-eye-slash text-gray-500 dark:text-gray-400"></i>
            </span>
          </div>

          <div className="relative">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Confirmar Senha</label>
            <input 
              type="password" 
              id="confirmPassword" 
              name="confirmPassword" 
              placeholder="Confirme sua senha" 
              className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white" 
              required 
              minLength="6"
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
            />
            <span className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer">
              <i className="fas fa-eye-slash text-gray-500 dark:text-gray-400"></i>
            </span>
          </div>

          <button 
            type="submit" 
            className="w-full px-4 py-2 text-white bg-blue-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors"
          >
            Cadastrar
          </button>
        </form>

        <div className="text-center text-gray-600 dark:text-gray-300">
          Já possui uma conta?
          <Link to="/login" className="text-blue-500 hover:underline dark:text-blue-400"> Faça login</Link>
        </div>
      </div>
    </>
  );
}

export default Cadastro;