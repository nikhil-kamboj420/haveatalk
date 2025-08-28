import { LANGUAGE_TO_FLAG } from "../constants/rowData";

export const getFlagUrlByLang = (lang) => {
  const flag = LANGUAGE_TO_FLAG[lang.toLowerCase()];
  return flag ? `https://flagcdn.com/24x18/${flag}.png` : null;
};

export const capitalize = (str) => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
};
