import React, { useState, useEffect } from 'react';
import { Modal } from 'antd';
interface modalState {
  title: string;
  content: any;
}

interface ModalProps {
  onOk?: () => void | undefined;
  onCancel?: () => void | undefined;
}
const useModal = ({ title, content }: modalState) => {
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
      <Modal title={title} visible={visible} onOk={onOk} onCancel={onCancel}>
        {content}
      </Modal>
    );
  };
  const setShow = (status: boolean) => {
    setVisible(status);
  };
  return { setShow, CustomModal };
};
export default useModal;
