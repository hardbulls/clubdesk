export function topFunction() {
    const scrollDuration = 600; // Duration of the scroll animation in milliseconds
    const startTime: number = performance.now();
    const startY: number = window.scrollY;

    function scrollStep(timestamp: number): void {
        const elapsed = timestamp - startTime;
        window.scrollTo(0, easeInOut(elapsed, startY, -startY, scrollDuration));

        if (elapsed < scrollDuration) {
            requestAnimationFrame(scrollStep);
        }
    }

    function easeInOut(t: number, b: number, c: number, d: number): number {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(scrollStep);
}
