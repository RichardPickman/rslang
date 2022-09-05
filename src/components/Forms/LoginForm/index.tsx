import { Form, Input, Button } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import { RouteNames } from '../../../router';
import { LoginValues } from '../../../types/types';
import { rules } from '../../../utils/rules';
import '../styles.scss';

interface LoginFormProps {
  onFinish: (values: LoginValues) => void,
}

const LoginForm = ({onFinish }: LoginFormProps) => {
  return (
    <Form
    name="login"
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 16 }}
    // initialValues={{ remember: true }}
    onFinish={onFinish}
    autoComplete="off"
  >
    <Form.Item
      label="Email"
      name="email"
      validateTrigger="onBlur"
      rules={[rules.required('Введите e-mail'), rules.isEmailCorrect()]}
    >
      <Input autoComplete='off'/>
    </Form.Item>

    <Form.Item
      label="Пароль"
      name="password"
      validateTrigger="onBlur"
      rules={[rules.required('Введите пароль'), rules.isPasswordCorrect()]}
    >
      <Input.Password />
    </Form.Item>

    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
      <Button type="primary" htmlType="submit">
        Войти
      </Button>
    </Form.Item>

    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
      <span>Еще не с нами? </span>
      <Link to={RouteNames.SIGNIN}>
        Зарегистрируйся
      </Link>
    </Form.Item>    
  </Form>
  );
};

export default LoginForm;