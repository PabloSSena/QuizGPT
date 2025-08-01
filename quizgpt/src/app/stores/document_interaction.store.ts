import { create } from "zustand";

interface IDocumentInteractionStore {
  file: File | null;
  isDragOver: boolean;
  setFile: (file: File | null) => void;
  setIsDragOver: (isDragOver: boolean) => void;
}

export const useDocumentInteractionStore = create<IDocumentInteractionStore>(
  (set) => ({
    file: null,
    isDragOver: false,
    setFile: (file: File | null) => set({ file }),
    setIsDragOver: (isDragOver: boolean) => set({ isDragOver }),
  })
);
