import { createContext } from "react";

type ImagesContextType = {
  branding1: string;
  branding2: string;
  branding3: string;
  logo: string;
};

const ImagesContext = createContext<ImagesContextType>({
  branding1: "",
  branding2: "",
  branding3: "",
  logo: "",
});

export default ImagesContext;
