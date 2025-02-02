const now = new Date()

export const getCurrentSeason = () => {
    if (now.getMonth() < 3) {
        return now.getFullYear() - 1;
    }

    return now.getFullYear();
}
