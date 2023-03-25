import React, { useMemo, useState } from 'react'
import { createRoot } from 'react-dom/client'

import { Gua } from './components/Gua'
import { ToggleButton } from './components/ToggleButton'
import { PushButton } from './components/PushButton'
import { coinCalculation, coinCalculationSimple, standardCalculation } from './calculation'
import { cnNumber } from './util/cn-name'
import data from './data/data'

import './index.css'
import Modal from "./components/Modal";

const App = () => {
   const [title, setTitle] = useState('')

   const [mode, setMode] = useState(1)
   const [algorithm, setAlgorithm] = useState(1)
   const [tuan, setTuan] = useState(true)
   const [xiang, setXiang] = useState(true)
   const [div2Err, setDiv2Err] = useState(10)

   const [gua, setGua] = useState([])
   const [ignoreInput, setIgnoreInput] = useState(false)
   const [messages, setMessages] = useState([])

   const appendMessage = (indent: number, text: string) => {
      setMessages(messages => [...messages, { indent, text }])
   }

   const result = useMemo(() => {
      if (gua.length < 6) {
         return <div>計算完成後結果會顯示在這裏</div>
      }

      const guaBinary = gua.map(yao => `${yao % 2}`).join('')
      const mutatedBinary = gua.map(yao => {
         switch (yao) {
            case 6: case 7: return '1'
            case 8: case 9: return '0'
         }
      }).join('')
      const mutatedCount = gua.reduce((acc, yao) => {
         if (yao === 6 || yao === 9) {
            return acc + 1
         } else {
            return acc
         }
      }, 0)
      console.log(mutatedCount)

      const originalGua = data[guaBinary]
      const mutatedGua = data[mutatedBinary]

      return (
         <div>
            <div>
               <span>{ `${originalGua['易'].name}卦第${cnNumber(originalGua.idx + 1)}` }</span>
               {
                  originalGua !== mutatedGua &&
                  <>
                     &nbsp;/&nbsp;
                     <span className="mutated">{
                        `${mutatedGua['易'].name}卦第${cnNumber(mutatedGua.idx + 1)}`
                     }</span>
                  </>
               }
            </div>
            <div>{ `${originalGua['易'].name}：${originalGua['易'].description}` }</div>
            { tuan && <div className="indented">{ `彖曰：${originalGua['彖'].join('')}` }</div> }
            { xiang && <div className="indented">{ `象曰：${originalGua['象'].description}` }</div> }

            {
               originalGua !== mutatedGua &&
               <>
                  <div className="mutated">
                     {`${mutatedGua['易'].name}：${mutatedGua['易'].description}`}
                  </div>
                  { tuan && <div className="mutated indented">{ `彖曰：${mutatedGua['彖'].join('')}` }</div> }
                  { xiang && <div className="mutated indented">{ `象曰：${mutatedGua['象'].description}` }</div> }
               </>
            }

            <br />

            {
               originalGua !== mutatedGua
               && guaBinary.split('')
                  .map((bin, idx) => {
                     const altBin = mutatedBinary[idx]
                     if ((mutatedCount <= 3 && bin === altBin)
                         || (mutatedCount > 3 && bin !== altBin)) {
                        return
                     }

                     return (
                        <div key={`mutation-${idx}`}>
                           <div>{ originalGua['易'].mutations[idx] }</div>
                           { xiang && <div className="indented">{ `象曰：${originalGua['象'].mutations[idx]}` }</div> }
                           <div className="mutated">{ mutatedGua['易'].mutations[idx] }</div>
                           { xiang && <div className="mutated indented">{ `象曰：${mutatedGua['象'].mutations[idx]}` }</div> }
                        </div>
                     )
                  })
            }

            {
               originalGua['易'].mutations.length > 6 &&
               <>
                  <div>{ originalGua['易'].mutations[6] }</div>
                  { xiang && <div className="indented">{ `象曰：${originalGua['象'].mutations[6]}` }</div> }
               </>
            }

            {
               originalGua !== mutatedGua && mutatedGua['易'].mutations.length > 6 &&
               <>
                  <div className="mutated">{ mutatedGua['易'].mutations[6] }</div>
                  { xiang && <div className="indented mutated">{ `象曰：${mutatedGua['象'].mutations[6]}` }</div> }
               </>
            }
         </div>
      )
   }, [gua, tuan, xiang])

   const [modalVisible, setModalVisible] = useState(false)
   const [modalTitle, setModalTitle] = useState(
      <div style={{ color: 'chartreuse', fontWeight: 1000 }}>
         高科技電腦算命系統
      </div>
   )
   const [modalContent, setModalContent] = useState(
      <div style={{ color: 'chartreuse' }}>

      </div>
   )
   const [modalButtons, setModalButtons] = useState([])

   const createModal = (modalTitle, modalContent, modalButtons) => {
      if (typeof modalButtons === 'function') {
         modalButtons = modalButtons(() => setModalVisible(false))
      }

      setModalTitle(modalTitle || <div style={{ color: 'chartreuse' }}>高科技電腦算命系統</div>)
      setModalContent(modalContent || <div style={{ color: 'chartreuse' }}></div>)
      setModalButtons(modalButtons)
      setModalVisible(true)
   }

   const startCalculation = () => {
      if (!title) {
         createModal(undefined, <div style={{ textAlign: 'left', color: '#FF0' }}>
            標題都不寫，浮躁的現代人就連進行迷信活動都要如此敷衍嗎？
         </div>, [])
         return
      }

      setIgnoreInput(true)
      if (mode === 1) {
         standardCalculation(algorithm, div2Err, setGua, appendMessage).then(() => {})
      } else if (mode === 2) {
         coinCalculation(setGua, appendMessage).then(() => {})
      } else {
         coinCalculationSimple(setGua, appendMessage).then(() => {})
      }
   }

   return (
      <>
         <div className="main-container">
            <div className="event-input">
               <input placeholder="在這裏寫需要測定的事件"
                      value={title}
                      onChange={e => setTitle(e.target.value)}
                      readOnly={ignoreInput}
               />
            </div>
            <div className="upper-container">
               <Gua id="gua" gua={gua} />
               <div className="upper-right-container">
                  <div>
                     <span>起卦方式</span>
                     <ToggleButton text="大衍筮法"
                                   state={mode === 1}
                                   onToggled={() => { !ignoreInput && setMode(1) }}
                                   title="模擬周易最傳統的使用蓍草的起卦方式"
                     />
                     <ToggleButton text="金錢卦"
                                   state={mode === 2}
                                   onToggled={() => { !ignoreInput && setMode(2) }}
                                   title="使用銅錢替代蓍草的簡化起卦方法，陰陽概率是完全均等的"
                     />
                     <ToggleButton text="金錢卦（模擬）"
                                   state={mode === 3}
                                   onToggled={() => { !ignoreInput && setMode(3) }}
                                   title="概率上同金錢卦，但是使用更簡單的隨機數模擬"
                     />
                  </div>
                  <div>
                     <span>大衍筮法</span>
                     <ToggleButton text="朱子算法"
                                   state={algorithm === 1}
                                   disabled={mode !== 1}
                                   onToggled={() => { !ignoreInput && setAlgorithm(1) }}
                                   title="朱熹紀錄的揲蓍方法，每一變都要掛一"
                     />
                     <ToggleButton text="郭雍算法"
                                   state={algorithm === 2}
                                   disabled={mode !== 1}
                                   onToggled={() => { !ignoreInput && setAlgorithm(2) }}
                                   title="郭雍紀錄的揲蓍方法，只有第一變掛一"
                     />
                     <ToggleButton text="48 策算法"
                                   state={algorithm === 3}
                                   disabled={mode !== 1}
                                   onToggled={() => { !ignoreInput && setAlgorithm(3) }}
                                   title={
                                      '以48策而不是49策開始揲蓍，並且每一遍都掛一。\n' +
                                      '該方法的概率分布更平均且與史料記載更符合'
                                   }
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
                                    onClick={() => !ignoreInput && setDiv2Err(div2Err - 5)}
                                    style={{ width: 8, height: 8, fontSize: 8 }}
                        />
                        <PushButton text=""
                                    title="-1"
                                    disabled={ mode !== 1 || div2Err <= 0 }
                                    onClick={() => !ignoreInput && setDiv2Err(div2Err - 1)}
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
                                    onClick={() => !ignoreInput && setDiv2Err(div2Err + 1)}
                                    style={{ width: 8, height: 8, fontSize: 8 }}
                        />
                        <PushButton text=""
                                    title="+5"
                                    disabled={ mode !== 1 || div2Err > 20 }
                                    onClick={() => !ignoreInput && setDiv2Err(div2Err + 5)}
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
                                   onToggled={() => !ignoreInput && setTuan(!tuan)}
                                   title="輸出中包含彖辞对于周易的解釋"
                     />
                     <ToggleButton text="象辞"
                                   state={xiang}
                                   onToggled={() => !ignoreInput && setXiang(!xiang)}
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
               <div className="medium-container-inner"
                    style={{ display: messages.length === 0 ? undefined : 'none' }}>
                  <PushButton text="啟動"
                              style={{ width: 64, fontSize: 18 }}
                              onClick={startCalculation}
                  />
               </div>
               <div style={{ display: messages.length !== 0 ? undefined : 'none' }}>{
                  messages.map((msg, idx) => (
                     <div key={`message-${idx}`}
                          style={{ marginLeft: `${msg.indent}em` }}
                     >
                        {msg.text}
                     </div>
                  ))
               }</div>
            </div>
            <div className="content-container">
               { result }
            </div>
         </div>
         <Modal state={[modalVisible, setModalVisible]}
                title={modalTitle}
                content={modalContent}
                buttons={ modalButtons.length !== 0 ? modalButtons : undefined }
         />
      </>
   )
}

const root = createRoot($('body > div'))
root.render(<App />)
