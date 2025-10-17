"use client";

import React, { useState } from "react";
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  updateProfile 
} from "firebase/auth";
import { auth } from "../../lib/firebaseConfig";
import { useAuth } from "../../../context/AuthContext";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { refreshUser } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      console.log('🔐 Intentando autenticar...', { email, username, isLogin });
      
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        console.log('✅ Login exitoso');
      } else {
        // Registro con nombre de usuario
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        
        // Actualizar el perfil con el nombre de usuario
        if (username.trim()) {
          await updateProfile(userCredential.user, {
            displayName: username.trim()
          });
          // Forzar actualización del contexto
          await refreshUser();
        }
        
        console.log('✅ Registro exitoso - Nombre:', userCredential.user.displayName);
      }
    } catch (error: any) {
      console.error('❌ Error de autenticación:', error);
      
      switch (error.code) {
        case 'auth/configuration-not-found':
          setError('Error de configuración de Firebase. Verifica la consola de Firebase.');
          break;
        case 'auth/email-already-in-use':
          setError('Este email ya está registrado.');
          break;
        case 'auth/invalid-email':
          setError('El formato del email es inválido.');
          break;
        case 'auth/weak-password':
          setError('La contraseña debe tener al menos 6 caracteres.');
          break;
        case 'auth/user-not-found':
          setError('No existe una cuenta con este email.');
          break;
        case 'auth/wrong-password':
          setError('Contraseña incorrecta.');
          break;
        default:
          setError(`Error: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center mode-bg">
      <div className="max-w-md w-full space-y-8 p-8 mode-fg rounded-lg shadow-lg border border-gray-300">
        <div>
          <h2 className="text-center text-3xl font-extrabold mode-color">
            {isLogin ? "Iniciar sesión" : "Registrarse"}
          </h2>
          <p className="mt-2 text-center text-sm mode-color">
            {isLogin ? "Accede a tu cuenta" : "Crea una nueva cuenta"}
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {/* Campo de nombre de usuario solo para registro */}
          {!isLogin && (
            <div>
              <label htmlFor="username" className="block text-sm font-medium mode-color">
                Nombre de usuario *
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required={!isLogin}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mode-fg mode-color placeholder-gray-500"
                placeholder="Cómo quieres que te llamen en el chat"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                minLength={2}
                maxLength={20}
              />
              <p className="mt-1 text-xs mode-color">Este será tu nombre visible en el chat</p>
            </div>
          )}
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium mode-color">
              Email *
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mode-fg mode-color placeholder-gray-500"
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium mode-color">
              Contraseña *
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              minLength={6}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mode-fg mode-color placeholder-gray-500"
              placeholder="Mínimo 6 caracteres"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              <strong>Error:</strong> {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white mode-bg hover:mode-bg-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200"
          >
            {loading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Procesando...
              </span>
            ) : (
              isLogin ? "Iniciar sesión" : "Crear cuenta"
            )}
          </button>

          <div className="text-center">
            <button
              type="button"
              onClick={() => {
                setIsLogin(!isLogin);
                setError("");
                setUsername("");
              }}
              className="mode-color hover:text-blue-500 text-sm transition duration-200"
            >
              {isLogin 
                ? "¿No tienes cuenta? Regístrate aquí" 
                : "¿Ya tienes cuenta? Inicia sesión aquí"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;