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
  pageNumber: 1,
  addPageNumber: () => set((state) => ({ pageNumber: state.pageNumber + 1 })),
  resetPageNumber: () => set({ pageNumber: 1 }),
  noMorePages: false,
  setNoMorePages: (noMorePages) => set({ noMorePages }),
  filtro: "",
  setFiltro: (filtro) => set({ filtro }),
  resetFiltro: () => set({ filtro: "" }),
}));

export default usePetStore;
