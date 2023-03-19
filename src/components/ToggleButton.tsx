import React from 'react'

import './ToggleButton.css'

export const statusPool = {}

export const ToggleButton = ({ text, id, initStatus, disabled, title, onToggled }) => {
   statusPool[id] = statusPool[id] || initStatus || false

   let className = 'toggle-button'
   if (disabled) {
      className += ' disabled'
   }
   if (statusPool[id]) {
      className += ' toggled'
   }

   return (
      <div id={id} className={className} title={title}>
         <div className="toggle-button-switch">
            <div />
         </div>
         <div className="toggle-button-text">{text}</div>
      </div>
   )
}
