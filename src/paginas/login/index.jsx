import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../Firebase'; // Supondo que você tenha um arquivo firebase configurado
import './index.css';

function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mensagem, setMensagem] = useState('');
  const navigate = useNavigate();

  const validaLogin = async (e) => {
    e.preventDefault();
    try {
      await auth.signInWithEmailAndPassword(email, senha);
      navigate("/principal");
    } catch (error) {
      const errorCode = error.code;
      
      if (errorCode === 'auth/internal-error' ||
          errorCode === 'auth/invalid-credential' || 
          errorCode === 'auth/user-not-found' || 
          errorCode === 'auth/wrong-password') {
        mostrarMensagemErro();
      } else {
        mostrarMensagemErro("Erro ao fazer login");
      }
    }
  };

  const mostrarMensagemErro = (msg = 'E-mail ou senha incorretos!') => {
    setMensagem(msg);
  };

  return (
    <>
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 space-y-6">
        <h2 className="text-3xl font-bold text-center text-blue-600 dark:text-blue-400">Login</h2>
        <p className="text-center text-gray-600 dark:text-gray-300">Insira seu email e sua senha para acessar a sua conta</p>

        {mensagem && (
          <div className="text-center text-red-500 dark:text-red-400">
            {mensagem}
          </div>
        )}

        <form className="space-y-4" onSubmit={validaLogin}>
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
              placeholder="Insira sua senha" 
              className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white" 
              required 
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
            <span className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer">
              <i className="fas fa-eye-slash text-gray-500 dark:text-gray-400"></i>
            </span>
          </div>

          <div className="flex justify-end">
            <a href="#" className="text-sm text-blue-500 hover:underline dark:text-blue-400">Esqueceu sua senha?</a>
          </div>

          <button 
            type="submit" 
            className="w-full px-4 py-2 text-white bg-blue-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors"
          >
            Login
          </button>
        </form>

        <div className="text-center text-gray-600 dark:text-gray-300">
          Não possui uma conta?
          <Link to="/cadastro" className="text-blue-500 hover:underline dark:text-blue-400"> Cadastrar-se</Link>
        </div>
      </div>
    </>
  );
}

export default Login;