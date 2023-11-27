import { loadFiles } from "./util/files"

export const LogoMapping = loadFiles(require.context("./assets/league-logos/", false, /\.svg$/))

//
// export const LogoMapping: { [key: string]: string } = {
//     "bbl.svg": BblLeagueLogo,
//     "2-blw.svg": BblLeagueLogo,
// }
