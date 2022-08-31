import React from 'react';
import { Form, Input, Button } from 'antd';
import { Link } from 'react-router-dom';
import { RouteNames } from '../../router';
import { SignupValues } from '../../types/types';
import { rules } from './../../utils/rules';

interface SignupFormProps {
  onFinish: (values: SignupValues) => void,
}

const SignupForm = ({ onFinish }: SignupFormProps) => {
  return (
    <Form
      name="signin"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      autoComplete="off"
    >
      <Form.Item
        label="Имя"
        name="name"
        rules={[rules.required('Введите имя')]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Email"
        name="email"
        rules={[rules.required('Введите e-mail'), rules.isEmailCorrect()]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Пароль"
        name="password"
        rules={[rules.required('Введите пароль'), rules.isPasswordCorrect()]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Зарегистрироваться
        </Button>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <span>Уже есть аккаунт? </span>
        <Link to={RouteNames.AUTHORIZATION}>
          Войти
        </Link>
      </Form.Item>
    </Form>
  );
};

export default SignupForm;