import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const Modal =({ show, children, userName, userId, _handleUserNameChange, _handleClose, _resetUserName }) => {
  const showHideClassName = show ? "modal-display-block" : "modal-display-none";

  const [clockDisplay, setClockDisplay] = useState(localStorage.getItem('clockDisplay') || '24 hours');
  const [enterKey, setEnterKey] = useState(localStorage.getItem('enterKey') || false);

  useEffect(() => {
    !localStorage.getItem('clockDisplay') && localStorage.setItem('clockDisplay','24 hours');
    !localStorage.getItem('enterKey') && localStorage.setItem('enterKey',false);
  }, []);

  const _resetSettings = () => {
    localStorage.clear();
    _handleClose();
    setClockDisplay('24 hours');
    setEnterKey(false);
    _resetUserName();
  }

  return (
    <div className={ showHideClassName }>
      <div className="modal">
        <div className="modal__head">
          <div className="modal__head__title">Settings Configuration</div>
          <div className="modal__head__close" onClick={ _handleClose }>x</div>
        </div>

        <div className="modal__body">
          { children }
          <ul>

          <li><div className="clock">Clock Display

            <div className="clock__buttons">
              <div>
                <input type="radio" name="group1" value="hours" checked={ clockDisplay === "12 hours" && true} 
                onChange={()=>{
                  setClockDisplay('12 hours')
                  localStorage.setItem('clockDisplay','12 hours');
                }} />
                <label htmlFor="hours">12 hours</label>
              </div>

              <div onClick={()=>{
                setClockDisplay('24 hours');
                localStorage.setItem('clockDisplay','24 hours');
                }}>
                <input type="radio" name="group1" value="hours" checked={ clockDisplay === "24 hours" && true } 
                onChange={()=>{
                  setClockDisplay('24 hours')
                  localStorage.setItem('clockDisplay','24 hours');
                }} />
                <label htmlFor="hours">24 hours</label>
              </div>
            </div>

          </div></li>

          <li><div className="enter">Send messages on cntrl/cmd+enter

            <div className="enter__buttons">
              <div>
                <input type="radio" name="group2" value="key" checked={ enterKey && true } 
                onChange={()=>{
                  setEnterKey(true);
                  localStorage.setItem('enterKey',true);
                }}/>
                <label htmlFor="key">on</label>
              </div>

              <div>
                <input type="radio" name="group2" value="key"checked={ !enterKey && true } 
                onChange={()=>{
                  setEnterKey(false);
                  localStorage.setItem('enterKey',false);
                }}/>
                <label htmlFor="key">off</label>
              </div>
            </div>
          </div></li>

          <li><div className="change-name">Change user name
            <input 
                value={ userName}  
                maxLength = '20' 
                onChange={ _handleUserNameChange } 
                placeholder={userId}
              />
          </div></li>
          </ul>
        </div>

        <div className="modal__footer">
          <div className="modal__footer__reset" onClick = { _resetSettings }>Reset to Default</div>
        </div>
      </div>
    </div>
  );
}

Modal.propTypes = {
  show: PropTypes.bool,
  children: PropTypes.node,
  userName: PropTypes.string,
  userId: PropTypes.string,
  _handleClose: PropTypes.func,
  _handleUserNameChange: PropTypes.func,
  _resetUserName: PropTypes.func
}

export default Modal;