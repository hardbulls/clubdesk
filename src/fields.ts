import fields from "../config/fields.json"
import type { Field } from "./model/Field"

export const getFields = (): Field[] => {
    return fields as Field[]
}

const fieldCache: { [key: string]: Field } = {}

export const findField = (search: string): Field | undefined => {
    let cachedField = fieldCache[search]

    if (cachedField) {
        return cachedField
    }

    if (search.trim() === ",") {
        return undefined
    }

    cachedField = getFields().find((field) => {
        if (search === "Ducksfield, Wiener Neustadt") {
            console.log(search, field.keywords)
        }

        return field.keywords.includes(search)
    })

    if (!cachedField) {
        throw new Error(`Cannot find field ${search}`)
    }

    return cachedField
}
