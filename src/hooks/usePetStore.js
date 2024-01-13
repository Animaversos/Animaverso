import { create } from "zustand";

const usePetStore = create((set) => ({
  petsFiltrados: [],
  isLoading: false,
  setPets: (pets) => {
    set({ petsFiltrados: pets });
  },
  setIsLoading: (isLoading) => set({ isLoading }),
  delPets: () => {
    set({ petsFiltrados: [] });
  },
}));

export default usePetStore;
