// Zustand store (modalStore.ts)
import { create } from "zustand";

interface ModalState {
  opened: boolean;
  modalName: string | null;
  modalData: any | null;
  openModal: (modalName: string, data?: any) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  opened: false,
  modalName: null,
  modalData: null,
  openModal: (modalName, data = null) => set({ opened: true, modalName, modalData: data }),
  closeModal: () => set({ opened: false, modalName: null, modalData: null }),
}));
