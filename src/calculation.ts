import { randInt } from './util/rand'

function sleep(ms: number): Promise<void> {
   return new Promise(resolve => setTimeout(resolve, ms))
}

export async function standardCalculation(
   algorithm: number,
   div2Err: number,
   setOutput: (output: number[]) => void,
   log: (indent: number, message: string) => void
) {
   log(0, '正在使用大衍筮法起卦')

   log(2, `算法：${['朱子算法', '郭雍算法', '48 策算法'][algorithm - 1]}`)
   log(2, `分二誤差：${div2Err}`)

   await sleep(150)

   const arr = []
   for (let i = 0; i < 6; i++) {
      log(0, `正在計算第 ${i + 1} 爻`)
      arr.push(await standardCalculationPiece(algorithm, div2Err, log))
      setOutput([...arr])
      await sleep(250)
   }
}

async function standardCalculationPiece(
   algorithm: number,
   div2Err: number,
   log: (indent: number, message: string) => void
): Promise<number> {
   let count = algorithm === 3 ? 48 : 49
   log(2, `起始策數: ${count}`)

   count = await standardCalculationStep(count, div2Err, true, log)
   await sleep(75)
   log(2, `一變後策數：${count}`)
   count = await standardCalculationStep(count, div2Err, algorithm !== 2, log)
   await sleep(75)
   log(2, `二變後策數：${count}`)
   count = await standardCalculationStep(count, div2Err, algorithm !== 2, log)
   await sleep(75)
   log(2, `三變後策數：${count}`)

   await sleep(100)
   const result = count / 4
   log(2, `本爻為：${result}`)
   return result
}

async function standardCalculationStep(
   inCount: number,
   div2Err: number,
   takeOne: boolean,
   log: (indent: number, message: string) => void
): Promise<number> {
   // 分二
   const half = inCount / 2
   const halfLeft = Math.floor(half)
   if (div2Err >= halfLeft) {
      div2Err = halfLeft - 1
   }

   let lhs = randInt(halfLeft - div2Err, halfLeft)
   let rhs = inCount - lhs
   log(4, `分二，左 ${lhs}，右 ${rhs}`)

   // 挂一
   if (takeOne) {
      const takeOneSide = randInt(0, 1)
      if (takeOneSide === 0) {
         log(4, `左侧掛一`)
         lhs -= 1
      } else {
         log(4, `右侧掛一`)
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
   log(4, `揲四歸奇，得 ${rest}`)
   return rest
}

export async function coinCalculation(
   setOutput: (output: number[]) => void,
   log: (indent: number, message: string) => void
) {
   log(0, '正在使用金錢卦起卦')
   await sleep(150)

   const arr = []
   for (let i = 0; i < 6; i++) {
      log(0, `正在計算第 ${i + 1} 爻`)
      const [c1, c2, c3] = [randInt(0, 1), randInt(0, 1), randInt(0, 1)]
      const sides = ['反', '正']
      log(2, `擲銅板，得：${sides[c1]}、${sides[c2]}、${sides[c3]}`)
      
      const result = [6, 8, 7, 9][c1 + c2 + c3]
      log(2, `本爻為：${result}`)
      arr.push(result)
      setOutput([...arr])
      await sleep(250)
   }
}

export async function coinCalculationSimple(
   setOutput: (output: number[]) => void,
   log: (indent: number, message: string) => void
) {
   log(0, '正在使用簡化金錢卦起卦')
   await sleep(150)

   const arr = []
   for (let i = 0; i < 6; i++) {
      log(0, `正在計算第 ${i + 1} 爻`)
      const value = randInt(0, 7)
      log(2, `隨機數發生器輸出：${value}`)
      
      const result = [6, 8, 8, 8, 7, 7, 7, 9][value]
      log(2, `本爻為：${result}`)
      arr.push(result)
      setOutput([...arr])
      await sleep(250)
   }
}
