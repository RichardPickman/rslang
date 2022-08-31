import React, { useEffect } from 'react';
import Layout from '../../components/Layout';
import { useLocation, useNavigate } from 'react-router-dom';
import { LoginValues, TransitionEnum } from '../../types/types';
import LoginForm from '../../components/LoginForm';
import { useActions } from './../../hooks/useActions';
import Modal from '../../components/ui/Modal';
import { NavigateState } from './../../types/types';

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
      <>
        {mode === TransitionEnum.REDIRECTION &&
          <div>
            <p>Запрашиваемая страница доступна только авторизированным пользователям.</p>
            <p>Пожалуйста, войдите в свой аккаунт.</p>
          </div>}
        <LoginForm onFinish={submitForm} />
      </>
    </Layout>
  );
};

export default Login;