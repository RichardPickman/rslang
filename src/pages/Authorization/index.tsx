import React, { useEffect } from 'react';
import Layout from '../../components/Layout';
import { useLocation, useNavigate } from 'react-router-dom';
import { LoginValues, TransitionEnum } from '../../types/types';
import LoginForm from '../../components/Forms/LoginForm';
import { useActions } from './../../hooks/useActions';
import Modal from '../../components/ui/Modal';
import { NavigateState } from './../../types/types';
import styles from './styles.module.scss';
import Container from './../../components/Container/index';
import { motion } from 'framer-motion';

const Login = () => {
  const { login } = useActions();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { mode, location } = state as NavigateState || { mode: null, location: null };
  const submitForm = (values: LoginValues) => {
    login(values, navigate, onLoginFailed, location);
  };

  const onLoginFailed = () => {
    Modal.showErrorModal('Неверный e-mail или пароль.');
  }

  return (
    <Layout>
      <div className={`${styles['section-authorization']}`}>
        <motion.div
          className={`${styles['bg-items']}`}
          animate={{ rotate: 7 }}
          transition={{ repeat: Infinity, duration: 6, repeatType: 'mirror' }}
        />
        <div className={styles['redirection__inner']}>
          {mode === TransitionEnum.REDIRECTION &&

            <>
              <div className={styles['redirection-info']}>
                <p>Запрашиваемая страница доступна только авторизированным пользователям.</p>
                <p>Пожалуйста, войди в свой аккаунт.</p>
              </div>
            </>
          }
          <LoginForm onFinish={submitForm} />
        </div>
      </div>
    </Layout>
  );
};

export default Login;