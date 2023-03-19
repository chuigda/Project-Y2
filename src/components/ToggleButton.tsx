import React from 'react'

import './ToggleButton.css'

export const ToggleButton = ({ text, initStatus, disabled, title, onToggled }) => {
   const status = initStatus || false

   let className = 'toggle-button'
   if (disabled) {
      className += ' disabled'
   }
   if (status) {
      className += ' toggled'
   }

   return (
      <div className={className} title={title}>
         <div className="toggle-button-switch">
            <div />
         </div>
         <div className="toggle-button-text">{text}</div>
      </div>
   )
}
