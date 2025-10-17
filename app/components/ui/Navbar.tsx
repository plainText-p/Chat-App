"use client";

import React from "react";
import { useAuth } from "../../../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  // Función para obtener el nombre a mostrar
  const getDisplayName = () => {
    if (user?.displayName) {
      return user.displayName;
    }
    if (user?.email) {
      return user.email.split('@')[0]; // Mostrar la parte antes del @
    }
    return "Usuario";
  };

  return (
    <nav className="mode-fg shadow-lg border-b border-gray-300">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="font-bold text-xl mode-color">Chat App</div>
          
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 mode-bg rounded-full flex items-center justify-center text-white font-semibold">
                    {getDisplayName().charAt(0).toUpperCase()}
                  </div>
                  <span className="mode-color font-medium">
                    Hola, {getDisplayName()}!
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="mode-bg hover:mode-bg-hover text-white px-4 py-2 rounded-lg transition duration-200"
                >
                  Cerrar sesión
                </button>
              </>
            ) : (
              <span className="mode-color">No autenticado</span>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;