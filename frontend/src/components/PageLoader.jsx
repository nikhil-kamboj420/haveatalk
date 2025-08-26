import { useThemeStore } from "../store/useThemeStore";

const PageLoader = () => {
  const { theme} = useThemeStore();
  return (
    <div className="flex items-center justify-center h-screen  bg-black" data-theme={theme}>
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-e-white border-opacity-75"></div>
    </div>
  );
};

export default PageLoader;
