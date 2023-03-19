import { h } from 'tsx-dom'

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
      <div id={id} class={className} title={title}>
         <div class="toggle-button-switch">
            <div />
         </div>
         <div class="toggle-button-text">{text}</div>
      </div>
   )
}
