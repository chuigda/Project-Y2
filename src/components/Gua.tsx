import React from 'react'

import { Yao } from './Yao'

import data from '../data/data'
import './Gua.css'

export const Gua = ({ id, gua }) => {
   const yaoList = gua.map((yao, idx) => (
      <Yao key={`yao-${idx}`}
           value={yao % 2 !== 0}
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
      <div id={id} className="gua">
         <div className="yao-list">
            { yaoList }
         </div>
         <div className="gua-name-container"
              style={{ display: gua.length === 6 ? undefined : 'none' }}>
            <span className="gua-name">
               { data[guaBinary] ? data[guaBinary]['易'].name : '' }
            </span>
            <span style={{ display: guaBinary !== mutatedBinary ? undefined : 'none'}}>
               <span className="gua-name-sep">/</span>
               <span className="gua-name-mutated">
                  {`${data[mutatedBinary] ? data[mutatedBinary]['易'].name : ''}`}
               </span>
            </span>
         </div>
         <div className="gua-name-container"
              style={{ display: gua.length !== 6 ? undefined : 'none' }}>
            -
         </div>
      </div>
   )
}
