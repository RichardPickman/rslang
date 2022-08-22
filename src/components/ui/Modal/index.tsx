import { message } from "antd";
import styles from './styles.module.scss';

class Modal {
  static showErrorModal(content: string) {
    message.error({
      content,
      className: `${styles.modal} ${styles['modal_error']}`,
    }, 5)
  }
}

export default Modal;