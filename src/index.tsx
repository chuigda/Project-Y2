import { h } from 'tsx-dom'

import './index.css'

const App = () => {
   return (
      <div class="main-container">
         <b>这是测试这是测试</b><br />
         这是测试这是测试
      </div>
   )
}

const body = $('body')
body.innerHTML = ''
body.appendChild(<App />)
