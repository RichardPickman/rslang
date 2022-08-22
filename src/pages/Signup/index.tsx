import React from 'react';
import Layout from '../../components/Layout';
import SignupForm from '../../components/SignupForm';
import { SignupValues } from '../../types/types';
import { useNavigate } from 'react-router-dom';
import { useActions } from '../../hooks/useActions';
import Modal from '../../components/ui/Modal';

const Signup = () => {
  const { signup } = useActions();
  const navigate = useNavigate();

  const onSignupFailed = () => {
    Modal.showErrorModal('Пользователь с таким e-mail уже существует.');
  }

  const submitForm = async (values: SignupValues) => {
    signup(values, navigate, onSignupFailed);
  };

  return (
    <Layout>
      <SignupForm onFinish={submitForm}></SignupForm>
    </Layout>
  );
};

export default Signup;