import React from 'react'

import './Yao.css'

export const Yao = ({ value, mutated }) => {
   let className = 'yao'
   if (!value) {
      className += ' yao-yin'
   }
   if (mutated) {
      className += ' yao-mutated'
   }
   return <div className={className} />
}
