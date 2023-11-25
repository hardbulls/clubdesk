import type {Team} from "./Team";

export type Standing = {
    results: Array<{
        position: number;
        team: Team;
        wins: number;
        loses: number;
        ties: number;
        winsPercentage: number;
        gamesBehind?: number;
    }>;
    type: "FINAL" | "GROUP_A" | "GROUP_B" | "GROUP_C" | "REGULAR" | "PLAYOFF" | "UNKNOWN";
}
