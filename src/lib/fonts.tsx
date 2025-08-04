import { Nunito_Sans } from "next/font/google";
import { Geist } from "next/font/google";



export const nunitoSans = Nunito_Sans(
  {
    subsets: ['latin'],
    variable: "--font-nunito"
  }
);
export const geist = Geist(
  {
    subsets: ['latin'],
    variable: "--font-geist"
  }
);