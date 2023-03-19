import { h } from 'tsx-dom'

import { Yao } from './Yao'
import data from '../data/data'

import './Gua.css'

export const Gua = ({ gua }) => {
   const yaoList = gua.map(yao => (
      <Yao value={yao % 2 !== 0}
           mutated={yao === 9 || yao === 6}
      />
   ))

   const guaBinary = gua.map(yao => `${yao % 2}`).join('')
   const mutatedBinary = gua.map(yao => {
      switch (yao) {
         case 6: case 7: return '1'
         case 8: case 9: return '0'
      }
   }).join('')

   return (
      <div class="gua">
         <div class="yao-list">
            { yaoList }
         </div>
         <div class="gua-name-container">
            <span class="gua-name">
               { data[guaBinary]['易'].name }
            </span>
            { guaBinary !== mutatedBinary &&
               <span>
                  <span class="gua-name-sep">/</span>
                  <span class="gua-name-mutated">{`${data[mutatedBinary]['易'].name}`}</span>
               </span>
            }
         </div>
      </div>
   )
}
