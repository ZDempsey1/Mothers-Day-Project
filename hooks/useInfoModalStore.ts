import { create } from 'zustand';

export interface ModalStoreInterface {
  flowerId?: string;
  isOpen: boolean;
  openModal: (flowerId: string) => void;
  closeModal: () => void;
}

const useInfoModalStore = create<ModalStoreInterface>((set) => ({
  movieId: undefined,
  isOpen: false,
  openModal: (flowerId: string) => set({ isOpen: true, flowerId }),
  closeModal: () => set({ isOpen: false, flowerId: undefined }),
}));

export default useInfoModalStore;
