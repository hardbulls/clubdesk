import LEAGUES from "../config/leagues.json"
import { JSDOM } from "jsdom"
import { findTeam } from "../src/team/teams"
import fs from "fs/promises"
import path from "path"
import { BattingProperties } from "../src/types/BattingProperties"
import { CalculationType } from "../src/types/enum/CalculationType"
import { getAllActivePlayers } from "../src/player/players"
import type { StatisticProperty } from "../src/types/StatisticProperty"
import { PitchingProperties } from "../src/types/PitchingProperty"
import { FieldingProperties } from "../src/types/FieldingProperties"
import { CURRENT_YEAR } from "../src/util/date"

interface TableConfig {
    [key: string | number]: (text: string | undefined | null, result: any) => void
}

const standingsTableMapping: TableConfig = {
    0: (text, result) => (result.place = text && Number.parseInt(text)),
    2: (text, result) => {
        const teamName = text?.trim()

        if (teamName) {
            result.team = findTeam(teamName)
        } else {
            throw new Error("Cannot find team")
        }
    },
    3: (text, result) => (result.wins = text && Number.parseInt(text)),
    4: (text, result) => (result.losses = text && Number.parseInt(text)),
    5: (text, result) => (result.ties = text && Number.parseInt(text)),
    6: (text, result) => (result.percentile = text && Number.parseFloat(text)),
    7: (text, result) => (result.gamesBehind = text && Number.parseFloat(text)),
}

const generateStatisticTableMapping = (statisticProperties: StatisticProperty[]) => {
    const mapping: TableConfig = {
        "Spieler:in": (text, result) => {
            if (!text) {
                return
            }

            const splitName = text.toLowerCase().split(" ")
            const name = splitName.reverse().join(" ")

            for (const player of getAllActivePlayers()) {
                if (player.name.toLowerCase() === name) {
                    result.name = player.name
                }
            }
        },
    }

    for (const property of statisticProperties) {
        const abbreviation = property.abbreviation
        if (property.type === CalculationType.AVG) {
            const parseFunction = (text: string | undefined | null, result: any) => {
                if (text) {
                    result[abbreviation] = Number.parseFloat(text.trim())
                } else {
                    result[abbreviation] = 0
                }
            }
            mapping[abbreviation] = parseFunction

            if (property.alias) {
                mapping[property.alias] = parseFunction
            }
        }

        if (property.type === CalculationType.SUM) {
            const parseFunction = (text: string | undefined | null, result: any) => {
                if (text) {
                    result[abbreviation] = Number.parseInt(text.trim())
                } else {
                    result[abbreviation] = 0
                }

                if (property.alias) {
                    result[property.alias] = result[abbreviation]
                }
            }
            mapping[abbreviation] = parseFunction

            if (property.alias) {
                mapping[property.alias] = parseFunction
            }
        }
    }

    return mapping
}

const parseHtmlTable = async (url: string, querySelector: string, config: TableConfig, numericIndex: boolean) => {
    const html = await fetch(url).then((response) => response.text())
    const dom = new JSDOM(html)
    const rows = dom.window.document.querySelector(querySelector)

    if (!rows) {
        throw new Error("Cannot parse table")
    }

    const data: any = []
    const headers = new Map<number, string | undefined | null | number>()

    for (const [rowIndex, row] of rows.querySelectorAll("tr").entries()) {
        const rowData: any = {}

        if (rowIndex > 0) {
            for (const [columnIndex, column] of row.querySelectorAll("td").entries()) {
                const header = numericIndex ? columnIndex : headers.get(columnIndex)

                if (header !== undefined && header !== null) {
                    const text = column.textContent
                    const columnFunction = config[header]

                    if (columnFunction) {
                        columnFunction(text, rowData)
                    }
                }
            }

            data.push(rowData)
        } else {
            for (const [headerIndex, header] of row.querySelectorAll("th").entries()) {
                if (header.textContent) {
                    headers.set(headerIndex, header.textContent && header.textContent.trim())
                }
            }
        }
    }

    return data
}

;(async () => {
    const OUTPUT_DIR =
        process.env["NODE_ENV"] === "production"
            ? path.join(__dirname, `../dist/api/`)
            : path.join(__dirname, `../public/api/`)
    await fs.mkdir(OUTPUT_DIR, { recursive: true })

    for (const league of LEAGUES) {
        if (league.table) {
            await fs.writeFile(
                path.join(OUTPUT_DIR, `${league.id}_${CURRENT_YEAR}.json`),
                JSON.stringify(await parseHtmlTable(league.table, "table.standings-print", standingsTableMapping, true))
            )
        }

        if (league.battingStats) {
            const battingStats = await parseHtmlTable(
                league.battingStats,
                "table.table-condensed",
                generateStatisticTableMapping(BattingProperties),
                false
            )
            const fieldingStats = await parseHtmlTable(
                league.fieldingStats,
                "table.table-condensed",
                generateStatisticTableMapping(FieldingProperties),
                false
            )

            const data = {}

            for (const battingStat of battingStats) {
                const name = battingStat["name"]

                if (name) {
                    data[name] = {
                        [CURRENT_YEAR]: {
                            batting: {
                                ...battingStat,
                            },
                        },
                    }
                }
            }

            for (const fieldingStat of fieldingStats) {
                const name = fieldingStat["name"]

                if (name) {
                    data[name] = {
                        [CURRENT_YEAR]: {
                            batting: {
                                ...data[name]?.[CURRENT_YEAR].batting,
                                ...fieldingStat,
                            },
                        },
                    }
                }
            }

            const pitchingStats = await parseHtmlTable(
                league.pitchingStats,
                "table.table-condensed",
                generateStatisticTableMapping(PitchingProperties),
                false
            )

            for (const pitchingStat of pitchingStats) {
                const name = pitchingStat["name"]

                if (name) {
                    data[name] = {
                        [CURRENT_YEAR]: {
                            ...(data?.[name]?.[CURRENT_YEAR] || {}),
                            pitching: pitchingStat,
                        },
                    }
                }
            }

            await fs.writeFile(path.join(OUTPUT_DIR, `${league.id}_${CURRENT_YEAR}_stats.json`), JSON.stringify(data))
        }
    }
})()
