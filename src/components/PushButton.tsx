import React from 'react'

import './PushButton.css'

export const PushButton = ({ text, id, disabled, title, onClick, style }) => {
   let className = 'push-button'
   if (disabled) {
      className += ' disabled'
   }

   return (
      <div className={className}
           id={id}
           title={title}
           onClick={() => {
              if (!disabled && onClick) {
                 onClick()
              }
           }}
           style={style}
      >
         {text}
      </div>
   )
}
