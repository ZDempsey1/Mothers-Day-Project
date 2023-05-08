import { create } from 'zustand';

export interface ModalStoreInterface {
    flowerId?: string;
    isOpen: boolean;
    openModal: (flowerId: string) => void;
    closeModal: () => void;
}

const useFlowerModalStore = create<ModalStoreInterface>((set) => ({
    flowerId: undefined,
    isOpen: false,
    openModal: (flowerId: string) => set({ isOpen: true, flowerId }),
    closeModal: () => set({ isOpen: false, flowerId: undefined }),
}));

export default useFlowerModalStore;
