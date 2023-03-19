import React, {useState} from 'react'
import { createRoot } from 'react-dom/client'

import { Gua } from './components/Gua'
import { ToggleButton } from './components/ToggleButton'
import { PushButton } from './components/PushButton'

import './index.css'

const App = () => {
   const [mode, setMode] = useState(1)
   const [algorithm, setAlgorithm] = useState(1)
   const [tuan, setTuan] = useState(true)
   const [xiang, setXiang] = useState(true)
   const [div2Err, setDiv2Err] = useState(10)

   const [gua, setGua] = useState([])

   return (
      <div className="main-container">
         <div className="event-input">
            <input placeholder="在這裏寫需要測定的事件"></input>
         </div>
         <div className="upper-container">
            <Gua id="gua" gua={gua} />
            <div className="upper-right-container">
               <div>
                  <span>起卦方式</span>
                  <ToggleButton text="大衍筮法"
                                state={mode === 1}
                                onToggled={() => { setMode(1) }}
                                title="模擬周易最傳統的使用蓍草的起卦方式"
                  />
                  <ToggleButton text="金錢卦"
                                state={mode === 2}
                                onToggled={() => { setMode(2) }}
                                title="使用銅錢替代蓍草的簡化起卦方法，陰陽概率是完全均等的"
                  />
                  <ToggleButton text="金錢卦（模擬）"
                                state={mode === 3}
                                onToggled={() => { setMode(3) }}
                                title="概率上同金錢卦，但是使用更簡單的隨機數模擬"
                  />
               </div>
               <div>
                  <span>大衍筮法</span>
                  <ToggleButton text="朱子算法"
                                state={algorithm === 1}
                                disabled={mode !== 1}
                                onToggled={() => { setAlgorithm(1) }}
                                title="朱熹紀錄的揲蓍方法，每一變都要掛一"
                  />
                  <ToggleButton text="郭雍算法"
                                state={algorithm === 2}
                                disabled={mode !== 1}
                                onToggled={() => { setAlgorithm(2) }}
                                title="郭雍紀錄的揲蓍方法，只有第一變掛一"
                  />
                  <ToggleButton text="48 策算法"
                                state={algorithm === 3}
                                disabled={mode !== 1}
                                onToggled={() => { setAlgorithm(3) }}
                                title="以48策而不是49策開始揲蓍，並且每一遍都掛一。該方法的概率分布更平均且與史料記載更符合"
                  />
               </div>
               <div>
                  <span>分二誤差</span>
                  <div style={{
                     display: 'flex',
                     flexDirection: 'row',
                     alignItems: 'baseline',
                     columnGap: 12
                  }}>
                     <PushButton text=""
                                 title="-5"
                                 disabled={ mode !== 1 || div2Err < 5 }
                                 onClick={() => setDiv2Err(div2Err - 5)}
                                 style={{ width: 8, height: 8, fontSize: 8 }}
                     />
                     <PushButton text=""
                                 title="-1"
                                 disabled={ mode !== 1 || div2Err <= 0 }
                                 onClick={() => setDiv2Err(div2Err - 1)}
                                 style={{ width: 8, height: 8, fontSize: 8 }}
                     />
                     <span style={{
                        color: mode !== 1 ? '#999' : '#ff0',
                        width: 24,
                        textAlign: 'center'
                     }}>
                        { div2Err }
                     </span>
                     <PushButton text=""
                                 title="+1"
                                 disabled={ mode !== 1 || div2Err >= 25 }
                                 onClick={() => setDiv2Err(div2Err + 1)}
                                 style={{ width: 8, height: 8, fontSize: 8 }}
                     />
                     <PushButton text=""
                                 title="+5"
                                 disabled={ mode !== 1 || div2Err > 20 }
                                 onClick={() => setDiv2Err(div2Err + 5)}
                                 style={{ width: 8, height: 8, fontSize: 8 }}
                     />
                  </div>
               </div>
               <div>
                  <span>程式輸出</span>
                  <ToggleButton text="周易"
                                state={true}
                                disabled={true}
                                title="你要是連周易原文都不看，那我真不知道你在占什麽"
                  />
                  <ToggleButton text="彖辞"
                                state={tuan}
                                onToggled={() => {setTuan(!tuan)}}
                                title="輸出中包含彖辞对于周易的解釋"
                  />
                  <ToggleButton text="象辞"
                                state={xiang}
                                onToggled={() => {setXiang(!xiang)}}
                                title="輸出中包含象辞对于周易的解釋"
                  />
                  <ToggleButton text="譯文"
                                state={false}
                                disabled={true}
                                title="這個功能還沒實現，請見諒"
                  />
               </div>
            </div>
         </div>
         <div className="medium-container">
            <div className="medium-container-inner">
               <PushButton text="啟動" style={{ width: 64, fontSize: 18 }} />
            </div>
         </div>
      </div>
   )
}

const root = createRoot($('body'))
root.render(<App />)
