export const lerp = (from: number, to: number, amount: number) => {
  amount = amount < 0 ? 0 : amount;
  amount = amount > 1 ? 1 : amount;
  return from + (to - from) * amount;
};

/**
 * Checks that both numbers are within a range.
 * The default range is 1 because the units passed to this are pixels, and with
 * lerp values the last pixel never really arrives at the target.
 * @param a
 * @param b
 * @param targetDiff
 * @returns
 */
export const nearlyEqual = (a: number, b: number, targetDiff = 1) => {
  return Math.abs(a - b) < targetDiff;
};
