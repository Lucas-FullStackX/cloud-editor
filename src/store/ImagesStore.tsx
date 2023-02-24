import { CloudinaryImage } from '@cloudinary/url-gen';
import { create } from 'zustand';

interface IImgStore {
  publicUrl: string;
  editUrl: CloudinaryImage | null;
  setPublicUrl: (publicUrl: string) => void;
  setEditUrl: (editUrl: CloudinaryImage) => void;
}

const useImagesStore = create<IImgStore>()((set) => ({
  publicUrl: '',
  editUrl: null,
  setPublicUrl: (publicUrl) => set(() => ({ publicUrl })),
  setEditUrl: (editUrl) => set(() => ({ editUrl })),
}));

export default useImagesStore;
