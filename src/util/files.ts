import RequireContext = __WebpackModuleApi.RequireContext

interface FileMapping {
    [key: string]: string | undefined
}

export const loadFiles = (context: RequireContext) => {
    const imageNames = context.keys()

    const mapping: FileMapping = {}

    for (const [key, image] of imageNames.map(context).entries()) {
        const imageSource = image as string
        const name = imageNames[key] as string

        if (name) {
            mapping[name] = imageSource
        }
    }

    return mapping
}
