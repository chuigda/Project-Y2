import { h } from 'tsx-dom'

import './index.css'
import { Gua } from './components/Gua'

const App = () => {
   return (
      <div class="main-container">
         <div class="event-input">
            <input placeholder="在这里写需要测定的事件"></input>
         </div>
         <div class="upper-container">
            <Gua gua={[9, 6, 9, 6, 9, 6]} />
         </div>
      </div>
   )
}

const body = $('body')
body.innerHTML = ''
body.appendChild(<App />)
