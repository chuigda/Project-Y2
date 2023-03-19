import { randInt } from './util/rand'

async function sleep(ms: number) {
   return new Promise(resolve => setTimeout(resolve, ms))
}

export async function standardCalculation(
   algorithm: number,
   div2Err: number,
   setOutput: (output: number[]) => void,
   log: (message: string) => void
) {
   log(`正在使用大衍筮法起卦
\t算法：${['朱子算法', '郭雍算法', '48 策算法'][algorithm]}`
)

   const arr = []
   for (let i = 0; i < 6; i++) {
      arr.push(await standardCalculationPiece(algorithm, div2Err))
      setOutput([...arr])
      await sleep(500)
   }
}

async function standardCalculationPiece(algorithm: number, div2Err: number): Promise<number> {
   let count = algorithm === 3 ? 48 : 49

   count = await standardCalculationStep(count, div2Err, true)
   count = await standardCalculationStep(count, div2Err, algorithm !== 2)
   count = await standardCalculationStep(count, div2Err, algorithm !== 2)

   return count / 4
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
