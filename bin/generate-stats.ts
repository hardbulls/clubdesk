import csvtojson from "csvtojson"
import * as path from "path"
import fs from "fs/promises"
;(async () => {
    const years = ["2017", "2018", "2019", "2020", "2021", "2022"]
    // @ts-ignore perhaps type this later
    const players: any = {}

    for (const year of years) {
        const pitchingFile = path.join(__dirname, "../data", `bulls_stats_${year}_pitching.csv`)
        const battingFile = path.join(__dirname, "../data", `bulls_stats_${year}_batting.csv`)

        const pitchingJson = await csvtojson().fromFile(pitchingFile)

        for (const entry of pitchingJson) {
            const name = entry["Player"]

            if (!players[name]) {
                players[name] = {
                    [year]: {},
                }
            }

            if (!players[name][year]) {
                players[name][year] = {}
            }

            players[name][year].pitching = entry
        }

        const battingJson = await csvtojson().fromFile(battingFile)

        for (const entry of battingJson) {
            const name = entry["Player"]

            if (!players[name]) {
                players[name] = {
                    [year]: {},
                }
            }

            if (!players[name][year]) {
                players[name][year] = {}
            }

            players[name][year].batting = entry
        }
    }

    await fs.writeFile(path.join(__dirname, "../src/assets/bulls_stats.json"), JSON.stringify(players))
})()
