import { loadFiles } from "./util/files"

export const LogoMapping = loadFiles(require.context("./assets/league-logos/", false, /\.svg$/))
