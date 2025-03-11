import type { Field } from "../model/Field"
import { fetchV2Api } from "../api"

type ApiField = {
    venue?: string | null
    location: string
    teams: Array<string>
    image: string
    keywords: string[]
}

export class FieldRepository {
    public static async findAll(): Promise<Field[]> {
        return ((await fetchV2Api(`fields.json`)) as ApiField[]).map((apiField) => {
            return {
                ...apiField,
            }
        })
    }
}
