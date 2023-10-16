import { dateTimeFormatter, dateTimeFormatterShort, timeFormatter } from "../util/date"

export const formatGameTime = (value: Date, index: number, dateArray: Date[]) => {
    if (index === 0) {
        return dateTimeFormatter.format(value)
    }

    if (index === dateArray.length - 1) {
        return ` & ${timeFormatter.format(value)}`
    }

    return `, ${timeFormatter.format(value)}`
}

export const formatGameTimeShort = (value: Date, index: number, dateArray: Date[]) => {
    if (index === 0) {
        return dateTimeFormatterShort.format(value)
    }

    if (index === dateArray.length - 1) {
        return ` & ${timeFormatter.format(value)}`
    }

    return `: ${timeFormatter.format(value)}`
}
