import csv from "csvtojson"
import { promises as fs } from "fs"
import path from "path"

const GAMES_SHEET =
    "https://docs.google.com/spreadsheets/d/1FAGCHg1T5sl7U2dhiv_R7mDtU_rogioqCISK3Jk9KCo/gviz/tq?tqx=out:csv"

;(async () => {
    const response = await fetch(GAMES_SHEET)
    const csvData = await response.text()

    const jsonData = await csv({
        ignoreEmpty: true,
        includeColumns: /(Datum|Altersklasse|Spielort|Heim|Gast|Startzeit|isContinuation|isCanceled|isDelayed|movedTo)/,
    }).fromString(csvData)

    for (const row of jsonData) {
        if (row.isCanceled) {
            row.isCanceled = row.isCanceled.toLowerCase() === "true"
        }

        if (row.isDelayed) {
            row.isDelayed = row.isDelayed.toLowerCase() === "true"
        }

        if (row.isContinuation) {
            row.isContinuation = row.isContinuation.toLowerCase() === "true"
        }
    }

    await fs.writeFile(path.join(__dirname, "../src/assets/all_2023.json"), JSON.stringify(jsonData), "utf8")
})()
