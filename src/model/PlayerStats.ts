export interface PlayerStats {
    [key: string]: {
        pitching?: {
            [key: string]: string | number
        }
        batting?: {
            [key: string]: string | number
        }
    }
}
