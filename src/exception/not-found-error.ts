export class NotFoundError extends Error {
    constructor(type: string, identifier: string) {
        super(`${type} with identifier '${identifier}' not found.`)
    }
}
