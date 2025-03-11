import type { Field } from "./model/Field"
import { FieldRepository } from "./repository/field-repository"

const fieldCache: { [key: string]: Field } = {}

export const findField = async (search: string): Promise<Field | undefined> => {
    let cachedField = fieldCache[search]

    if (cachedField) {
        return cachedField
    }

    if (search.trim() === ",") {
        return undefined
    }

    cachedField = (await FieldRepository.findAll()).find((field) => {
        return field.keywords.includes(search)
    })

    if (!cachedField) {
        throw new Error(`Cannot find field ${search}`)
    }

    return cachedField
}
