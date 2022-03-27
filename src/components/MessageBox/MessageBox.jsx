import React, { useRef } from 'react';
import { MessageBoxType } from 'src/constants/enum.constants';
import '../../styles/style.css';
import { AppButton } from '../AppButtons';
import { Text } from '../Typography';
const MessageBox = (props) => {
  const msgbox = useRef();
  const messageBoxStyle = () => {
    if (props.type === MessageBoxType.SUCCESS) return 'msg-box msg-box-success slide-up-anim';
    if (props.type === MessageBoxType.ERROR) return 'msg-box msg-box-error slide-up-anim';
    if (props.type === MessageBoxType.INFORMATION) return 'msg-box msg-box-info slide-up-anim';
    else return 'msg-box';
  };
  const closeMsgBox = () => {
    msgbox.current.classList.remove('slide-up-anim');
    msgbox.current.classList.add('slide-down-anim');
    setTimeout(() => {
      props.onClick();
    }, 1000);
  };
  return (
    <div ref={msgbox} className="msg-box-container">
      <div className={messageBoxStyle()}>
        <Text>{props.message}</Text>
        <AppButton
          style={props.type === MessageBoxType.ERROR ? styles.btnOk : styles.btnOkDark}
          name={'ok'}
          onClick={() => closeMsgBox()}
        />
      </div>
    </div>
  );
};
const styles = {
  btnOk: {
    backgorundColor: 'var(--red)',
    color: 'var(--light)',
    border: '2px solid var(--light)',
    borderRadius: '25px',
  },
  btnOkDark: {
    backgorundColor: 'var(--light)',
    color: 'var(--dark)',
    border: '2px solid var(--dark)',
    borderRadius: '25px',
  },
};
export default MessageBox;
