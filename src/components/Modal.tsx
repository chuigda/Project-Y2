import React from 'react'

import './Modal.css'
import {PushButton} from "./PushButton";

const Modal = ({ state, title, content, buttons }: any) => {
   const [modalVisible, setModalVisible] = state

   return (
      <div className="modal-background"
           style={{ display: modalVisible ? undefined : 'none' }}>
         <div className="modal">
            <div className="modal-header">
               { title }
            </div>
            <div className="modal-content">
               { content }
            </div>
            <div className="modal-buttons">
               {
                  (buttons || [{ text: '確認', onClick: () => setModalVisible(false) }]).map((button, idx) => (
                     <PushButton key={`modal-button-${idx}`}
                                 {
                                    ...{
                                       ...button,
                                       style: {
                                          ...button.style,
                                          paddingLeft: '0.5em',
                                          paddingRight: '0.5em'
                                       }
                                    }
                                 }
                     />
                  ))
               }
            </div>
         </div>
      </div>
   )
}

export default Modal
