import { createContext, useContext, useState } from "react";

const ModalContext = createContext();

export function ModalProvider({ children }) {
  const [contactModalOpen, setContactModalOpen] = useState(false);

  // Feature: Open contact modal from any component
  const openContactModal = () => setContactModalOpen(true);
  const closeContactModal = () => setContactModalOpen(false);

  return (
    <ModalContext.Provider value={{ contactModalOpen, openContactModal, closeContactModal }}>
      {children}
    </ModalContext.Provider>
  );
}

// Feature: Hook for any component to control modal
export const useModal = () => useContext(ModalContext);
