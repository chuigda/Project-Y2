import data from './data.json'

function convertData() {
   const ret = {}
   for (const idx in data) {
      const gua = data[idx]
      for (const key in gua) {
         ret[key] = gua[key]
         ret[key].idx = parseInt(idx)
      }
   }
   return ret
}

export default convertData()
