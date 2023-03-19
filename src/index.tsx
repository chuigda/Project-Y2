import { h } from 'tsx-dom'

import { Gua } from './components/Gua'
import './index.css'
import {ToggleButton} from "./components/ToggleButton";

const App = () => {
   return (
      <div class="main-container">
         <div class="event-input">
            <input placeholder="在這裏寫需要測定的事件"></input>
         </div>
         <div class="upper-container">
            <Gua gua={[9, 6, 7, 6, 7, 8]} />
            <div class="upper-right-container">
               <div>
                  <span>起卦方式</span>
                  <ToggleButton text="大衍筮法"
                                id="mode1"
                                initStatus={true}
                                title="模擬周易最傳統的使用蓍草的起卦方式"
                  />
                  <ToggleButton text="金錢卦"
                                id="mode2"
                                title="使用銅錢替代蓍草的簡化起卦方法，陰陽概率是完全均等的"
                  />
                  <ToggleButton text="金錢卦（模擬）"
                                id="mode3"
                                title="概率上同金錢卦，但是使用更簡單的隨機數模擬"
                  />
               </div>
               <div>
                  <span>大衍筮法</span>
                  <ToggleButton text="朱子算法"
                                id="mode1-1"
                                initStatus={true}
                                title="朱熹紀錄的揲蓍方法，每一變都要掛一"
                  />
                  <ToggleButton text="郭雍算法"
                                id="mode1-2"
                                title="郭雍紀錄的揲蓍方法，只有第一變掛一"
                  />
                  <ToggleButton text="48 策算法"
                                id="mode1-2"
                                title="以48策而不是49策開始揲蓍，並且每一遍都掛一。該方法的概率分布更平均且與史料記載更符合"
                  />
               </div>
               <div>
                  <span>分二誤差</span>
               </div>
               <div>
                  <span>程式輸出</span>
                  <ToggleButton text="周易"
                                id="yi"
                                initStatus={true}
                                disabled={true}
                                title="你要是連周易原文都不看，那我真不知道你在占什麽"
                  />
                  <ToggleButton text="彖辞"
                                id="tuan"
                                initStatus={true}
                                title="輸出中包含彖辞对于周易的解釋"
                  />
                  <ToggleButton text="象辞"
                                id="xiang"
                                initStatus={true}
                                title="輸出中包含象辞对于周易的解釋"
                  />
                  <ToggleButton text="譯文"
                                id="trans"
                                initStatus={false}
                                disabled={true}
                                title="這個功能還沒實現，請見諒"
                  />
               </div>
            </div>
         </div>
      </div>
   )
}

const body = $('body')
body.innerHTML = ''
body.appendChild(<App />)
