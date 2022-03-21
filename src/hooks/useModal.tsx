import React, { useState } from 'react';
import { Modal } from 'antd';
interface ModalProps {
  onOk?: () => void | undefined;
  onCancel?: () => void | undefined;
  [rest: string]: any;
}
const useModal = (t?: string) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [title, setTitle] = useState<string>(t);
  const CustomModal = (props: ModalProps) => {
    return (
      <Modal
        width={1000}
        title={title}
        visible={visible}
        onOk={props.onOk}
        onCancel={props.onCancel}
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
