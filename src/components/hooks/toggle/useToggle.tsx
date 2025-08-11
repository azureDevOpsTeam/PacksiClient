import useStore from "../../../store/zustand/store"

export const useIsToggled = () => useStore((state) => state.isToggled);
export const useToggle = () => useStore((state) => state.toggle);
