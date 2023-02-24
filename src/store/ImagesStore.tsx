import { create } from 'zustand';

interface IImgStore {
  publicUrl: string;
  uploadUrl: string;
  setPublicUrl: (publicUrl: string) => void;
  setUploadUrl: (uploadUrl: string) => void;
}

const useImagesStore = create<IImgStore>()((set) => ({
  publicUrl: '',
  uploadUrl: '',
  setPublicUrl: (publicUrl) => set(() => ({ publicUrl })),
  setUploadUrl: (uploadUrl) => set(() => ({ uploadUrl })),
}));

export default useImagesStore;
