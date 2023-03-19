export function randInt(l: number, r: number): number {
   // l and r are inclusive
   return Math.floor(Math.random() * (r - l + 1)) + l;
}
