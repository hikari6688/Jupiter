import React, { useState } from 'react';
import { Modal } from 'antd';
interface ModalProps {
  onOk?: () => any;
  onCancel?: () => any;
  [rest: string]: any;
}
const useModal = (t?: string) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [title, setTitle] = useState<string>(t);
  const CustomModal = (props: ModalProps) => {
    const onOk = () => {
      if (props.onOk) {
        props.onOk();
        return;
      }
      setVisible(false);
    };
    const onCancel = () => {
      if (props.onCancel) {
        props.onCancel();
        return;
      }
      setVisible(false);
    };
    return (
      <Modal
        width={props.width || 1000}
        title={title}
        visible={visible}
        onOk={onOk}
        onCancel={onCancel}
      >
        {props.children}
      </Modal>
    );
  };
  const setShow = (status: boolean) => {
    setVisible(status);
  };
  return [setShow, CustomModal, setTitle] as const;
};
export default useModal;
