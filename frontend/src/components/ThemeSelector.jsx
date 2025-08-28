import { THEMES } from "../constants/rowData";
import { useThemeStore } from "../store/useThemeStore";

export const ThemeSelector = () => {
  const { setTheme } = useThemeStore();
  return (
    <div className="text-3xl absolute right-[3rem] bg-gray-600 max-h-[50vh] overflow-y-auto shadow-2xl shadow-black">
      <div className="max-h-[50vh]">
        {THEMES.map(({ name, label, colors }) => {
          return (
            <div
              className="list-none  theme-grid-col3  gap-8 max-w-[30vw] left-56"
              key={name}
            >
              <span> 🎨</span>
              <span className="cursor-pointer " onClick={() => setTheme(name)}>
                {label}
              </span>
              {
                <span className="flex gap-4 items-center">
                  {colors.map((color, index) => (
                    <span
                      key={index}
                      style={{ backgroundColor: color }}
                      className="w-5 h-5 rounded-full  cursor-pointer"
                    ></span>
                  ))}
                </span>
              }
            </div>
          );
        })}
      </div>
    </div>
  );
};
