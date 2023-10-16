export function* chunks<T>(array: T[], n: number) {
    for (let i = 0; i < array.length; i += n) yield array.slice(i, i + n)
}
