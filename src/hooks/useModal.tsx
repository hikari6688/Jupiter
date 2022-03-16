import React, { useState, useEffect } from 'react';
import { Modal } from 'antd';
import { type } from 'os';
// type modalState = [string, any];

interface ModalProps {
  onOk?: () => void | undefined;
  onCancel?: () => void | undefined;
  [reat:string]:any
}
const useModal = (title) => {
  const [visible, setVisible] = useState<boolean>(false);
  const CustomModal = (props: ModalProps) => {
    const onOk = () => {
      const { onOk } = props;
      onOk ? onOk() : setVisible(false);
    };
    const onCancel = () => {
      const { onCancel } = props;
      onCancel ? onCancel() : setVisible(false);
    };
    return (
      <Modal title={ title } visible={visible} onOk={onOk} onCancel={onCancel}>
        { props.children }
      </Modal>
    );
  };
  const setShow = (status: boolean) => {
    setVisible(status);
  };
  return { setShow, CustomModal };
};
export default useModal;
