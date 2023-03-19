import { randInt } from './util/rand'

async function sleep(ms: number) {
   return new Promise(resolve => setTimeout(resolve, ms))
}

export async function standardCalculation(
   algorithm: number,
   div2Err: number,
   setOutput: (output: number[]) => void,
   log: (indent: number, message: string) => void
) {
   log(0, '正在使用大衍筮法起卦')

   log(2, `- 算法：${['朱子算法', '郭雍算法', '48 策算法'][algorithm]}`)
   log(2, `- 分二誤差：${div2Err}`)

   await sleep(300)

   const arr = []
   for (let i = 0; i < 6; i++) {
      log(0, `正在計算第 ${i + 1} 爻`)
      arr.push(await standardCalculationPiece(algorithm, div2Err, log))
      setOutput([...arr])
      await sleep(500)
   }
}

async function standardCalculationPiece(
   algorithm: number,
   div2Err: number,
   log: (indent: number, message: string) => void
): Promise<number> {
   let count = algorithm === 3 ? 48 : 49
   log(2, ` - 起始策數: ${count}`)

   count = await standardCalculationStep(count, div2Err, true)
   await sleep(150)
   log(2, ` - 一變後策數：${count}`)
   count = await standardCalculationStep(count, div2Err, algorithm !== 2)
   await sleep(150)
   log(2, ` - 二變後策數：${count}`)
   count = await standardCalculationStep(count, div2Err, algorithm !== 2)
   await sleep(150)
   log(2, ` - 三變後策數：${count}`)

   await sleep(200)
   const result = count / 4
   log(2, ` - 本爻为：${result}`)
   return result
}

async function standardCalculationStep(
   inCount: number,
   div2Err: number,
   takeOne: boolean
): Promise<number> {
   // 分二
   const half = inCount / 2
   const halfLeft = Math.floor(half)
   if (div2Err >= halfLeft) {
      div2Err = halfLeft - 1
   }

   let lhs = randInt(halfLeft - div2Err, halfLeft)
   let rhs = inCount - lhs

   // 挂一
   if (takeOne) {
      const takeOneSide = randInt(0, 1)
      if (takeOneSide === 0) {
         lhs -= 1
      } else {
         rhs -= 1
      }
   }

   // 揲四
   let rest = 0
   while (lhs > 4) {
      lhs -= 4
      rest += 4
   }
   while (rhs > 4) {
      rhs -= 4
      rest += 4
   }

   // 归奇
   return rest
}
