import  {create} from "zustand"
export const useThemeStore =create((set)=>({
theme :  localStorage.getItem("HaveaTalk-theme") ||  "coffee",
showThemeSelector : false,
setTheme: ( theme) => {
    localStorage.setItem("HaveaTalk-theme", theme);
    set({theme})
},
setShowThemeSelector : (showThemeSelector) => set({showThemeSelector})
}))