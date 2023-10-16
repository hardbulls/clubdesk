export interface PlayerMapping {
    [key: string]: {
        [key: string]: {
            pitching?: {
                [key: string]: string
            }
            batting?: {
                [key: string]: string
            }
        }
    }
}

export interface Player {
    stats: {
        [key: string]: {
            pitching?: {
                [key: string]: string
            }
            batting?: {
                [key: string]: string
            }
        }
    }
}
