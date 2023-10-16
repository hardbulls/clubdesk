import { loadFiles } from "./util/files"
import type { Team } from "./model/Team"

const teamImageMapping = loadFiles(
    require.context("../config/images/teams/?as=webp&width=100&height=100", false, /\.png$/)
)

export const findCooperationTeamLogos = (team: Team): string[] => {
    if (!team.isCooperation) {
        throw new Error(`Team ${team.name} is not a cooperation.`)
    }

    const logos = team.logo.split("+")
    const images: string[] = []

    for (const logo of logos) {
        const filename = `./${logo}`
        const file = teamImageMapping[filename]

        if (file) {
            images.push(file)
        }
    }

    return images
}

export const findTeamLogo = (team: Team): string => {
    const filename = `./${team.logo}`
    const logo = teamImageMapping[filename]

    if (logo) {
        return logo
    }

    throw new Error(`Logo ${team.logo} not found!`)
}
