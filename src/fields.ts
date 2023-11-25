import fields from "../config/fields.json"
import type {Field} from "./model/Field";


export const getFields = (): Field[] => {
    return fields as Field[]
}

const fieldCache: { [key: string]: Field } = {}

export const findField = (team: string, search: string): Field|undefined => {
    let cachedField = fieldCache[search]

    if (cachedField) {
        return cachedField
    }

    cachedField = getFields().find((field) => {
        if (
            field.teams.includes(team) &&
            field.venue &&
            (field.venue.includes(search) || search.includes(field.venue))
        ) {
            return true
        }

        if (field.teams.includes(team) && (field.location.includes(search) || search.includes(field.location))) {
            return true
        }

        if (field.teams.includes(team) && field.keywords.includes(search)) {
            return true
        }

        if (field.venue && (field.venue.includes(search) || search.includes(field.venue))) {
            return true
        }

        if (field.location.includes(search) || search.includes(field.location)) {
            return true
        }

        return false
    })

    return cachedField
}
