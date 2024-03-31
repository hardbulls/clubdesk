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
export function yesterday(): Date {
    return new Date(new Date().setDate(new Date().getDate() - 1))
}

export function getMothersDay(currentDate: Date) {
    const mayFirst = new Date(currentDate.getFullYear(), 4, 1)
    const dayOfWeek = mayFirst.getDay()

    let firstSunday
    if (dayOfWeek == 0) {
        firstSunday = mayFirst
    } else {
        firstSunday = new Date()
        firstSunday.setDate(1 + (7 - dayOfWeek))
    }

    return new Date(currentDate.getFullYear(), 4, firstSunday.getDate() + 7)
}

export function isEasterSunday(currentDate: Date) {
    const year = currentDate.getFullYear()
    const a = year % 19
    const b = Math.floor(year / 100)
    const c = year % 100
    const d = Math.floor(b / 4)
    const e = b % 4
    const f = Math.floor((b + 8) / 25)
    const g = Math.floor((b - f + 1) / 3)
    const h = (19 * a + b - d - g + 15) % 30
    const i = Math.floor(c / 4)
    const k = c % 4
    const l = (32 + 2 * e + 2 * i - h - k) % 7
    const m = Math.floor((a + 11 * h + 22 * l) / 451)
    const n0 = h + l + 7 * m + 114
    const n = Math.floor(n0 / 31) - 1
    const p = (n0 % 31) + 1
    const date = new Date(year, n, p)

    return currentDate.getMonth() == date.getMonth() && currentDate.getDate() == date.getDate()
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
