export const CURRENT_YEAR = new Date().getFullYear()

export const parseDate = (date: string) => {
    const datePattern = /^(\d{1,2})\/(\d{1,2})\/(\d{4})\s+(\d{1,2}):(\d{2})$/
    const parsedDate = datePattern.exec(date)

    if (!parsedDate || parsedDate.length !== 6) {
        throw new Error(`Invalid date format ${date}.`)
    }

    const [, month, day, year, hour, minute] = parsedDate.map((v) => Number.parseInt(v)) as Array<number>

    if (month && day && year) {
        return new Date(year, month - 1, day, hour, minute)
    }

    throw new Error(`Error parsing date ${date}.`)
}

export const parseGermanDate = (date: string) => {
    const datePattern = /^(\d{1,2})\.(\d{1,2})\.(\d{4})$/
    const parsedDate = datePattern.exec(date)

    if (!parsedDate || parsedDate.length !== 4) {
        throw new Error(`Invalid German date format ${date}.`)
    }

    const [, day, month, year] = parsedDate.map((v) => Number.parseInt(v)) as Array<number>

    if (month && day && year) {
        return new Date(year, month - 1, day, 12, 15)
    }

    throw new Error(`Error parsing German date ${date}.`)
}

export const sortByDate = (a: Date, b: Date): number => {
    if (a.getTime() > b.getTime()) {
        return 1
    }

    if (a.getTime() < b.getTime()) {
        return -1
    }

    return 0
}

export const dateTimeFormatterShort = new Intl.DateTimeFormat("de-AT", { dateStyle: "short", timeStyle: "short" })
export const dateFormatterShort = new Intl.DateTimeFormat("de-AT", { dateStyle: "short" })

export const dateTimeFormatter = new Intl.DateTimeFormat("de-AT", { dateStyle: "full", timeStyle: "short" })
export const dateFormatter = new Intl.DateTimeFormat("de-AT", { dateStyle: "full" })
export const timeFormatter = new Intl.DateTimeFormat("de-AT", { timeStyle: "short" })
