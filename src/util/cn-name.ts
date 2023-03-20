export function cnNumber(a: number): string {
   const digits = ['', '一', '二', '三', '四', '五', '六', '七', '八', '九']
   const tens = ['', '十']
   return (a >= 20 ? digits[Math.floor(a / 10)] : '') + tens[a / 10 >= 1 ? 1 : 0] + digits[a % 10]
}
