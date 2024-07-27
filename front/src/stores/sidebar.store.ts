import { StoreApi, UseBoundStore, create } from "zustand"

interface UseSideBar {
  isOpen: boolean
  toggleOpenSideBar: () => void
}

export const useSideBar: UseBoundStore<StoreApi<UseSideBar>> = create((set) => ({
  isOpen: true,
  toggleOpenSideBar: () => {
    set((prev) => ({ isOpen: !prev.isOpen }))
  },
}))
