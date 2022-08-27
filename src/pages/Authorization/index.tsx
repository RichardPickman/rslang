import React from 'react';
import Layout from '../../components/Layout';
import { useNavigate } from 'react-router-dom';
import { LoginValues } from '../../types/types';
import LoginForm from '../../components/LoginForm';
import { useActions } from './../../hooks/useActions';
import Modal from '../../components/ui/Modal';

const Login = () => {
  const { login } = useActions();
  const navigate = useNavigate();

  const submitForm = (values: LoginValues) => {
    login(values, navigate, onLoginFailed);
  };

  const onLoginFailed = () => {
    Modal.showErrorModal('Неверный e-mail или пароль.');
  }

  return (
    <Layout>
        <LoginForm onFinish={submitForm} />
    </Layout>
  );
};

export default Login;