import fields from "../config/fields.json"

export interface Field {
    venue?: string | null
    location: string
    teams: Array<string>
    image: string
    keywords: string[]
}

export const getFields = (): Field[] => {
    return fields as Field[]
}

const fieldCache: { [key: string]: Field } = {}

export const findField = (team: string, search: string): Field => {
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

    if (!cachedField) {
        throw new Error(`Field ${search} not found.`)
    }

    return cachedField
}
