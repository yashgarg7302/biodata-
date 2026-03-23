/**
 * Dynamically scales font sizes, photo size, and spacing
 * based on number of fields so everything fits on one A4 page.
 */
export function getScaleParams(fieldCount = 13) {
    // Base is 13 fields. Each field beyond 10 shrinks things slightly.
    const extra = Math.max(0, fieldCount - 10);
    const scalingFactor = fieldCount > 15 ? 0.45 : 0.35;

    const fontSize = Math.max(8, 14 - extra * scalingFactor);   // px  (min 8px)
    const nameSize = Math.max(18, 30 - extra * 0.6);    // px  (min 18px)
    const photoSize = Math.max(60, 120 - extra * 3.5);     // px  (min 60px)
    const gap = Math.max(1, 16 - extra * 1.0);    // px  (min 1px)
    const padding = Math.max(10, 32 - extra * 1.5);    // px  (min 10px)

    return { fontSize, nameSize, photoSize, gap, padding };
}
