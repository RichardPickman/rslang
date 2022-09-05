import React from 'react';
import Layout from '../../components/Layout';
import SignupForm from '../../components/Forms/SignupForm';
import { ErrorsEnum, SignupValues } from '../../types/types';
import { useNavigate } from 'react-router-dom';
import { useActions } from '../../hooks/useActions';
import Modal from '../../components/ui/Modal';
import { RouteNames } from '../../router';

const Signup = () => {
  const { signup } = useActions();
  const navigate = useNavigate();

  const onSignupSuccess = () => {
    Modal.showSuccessModal('Вы успешно зарегистрировались. Теперь вы можете войти в систему.');
    navigate(RouteNames.AUTHORIZATION, { replace: true });
  }

  const onSignupFailed = (error: string) => {
    if (error === ErrorsEnum.EMAIL_EXISTS) {
      Modal.showErrorModal('Пользователь с таким e-mail уже существует.');
    } else {
      Modal.showErrorModal('Ошибка при регистрации.');
    }
  }

  const submitForm = async (values: SignupValues) => {
    signup({values, navigate, onSignupFailed, onSignupSuccess});
  };

  return (
    <Layout>
      <SignupForm onFinish={submitForm}></SignupForm>
    </Layout>
  );
};

export default Signup;