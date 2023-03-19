import React from 'react'

import './ToggleButton.css'

export const ToggleButton = ({ text, state, disabled, title, onToggled }) => {
   const status = state || false

   let className = 'toggle-button'
   if (disabled) {
      className += ' disabled'
   }
   if (status) {
      className += ' toggled'
   }

   return (
      <div className={className} title={title}>
         <div className="toggle-button-switch" onClick={() => {
            if (!disabled && onToggled) {
               onToggled()
            }
         }}>
            <div onClick={onToggled}/>
         </div>
         <div className="toggle-button-text">{text}</div>
      </div>
   )
}
