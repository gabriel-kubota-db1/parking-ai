import { Card, Typography, Form as AntdForm, Input, Button, Alert } from 'antd';
import { Form, Field } from 'react-final-form';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import api from '../../../http/axios';

const { Title } = Typography;

const onSubmit = async (values: any) => {
  const { data } = await api.post('/auth/login', values);
  return data;
};

export const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const { mutate, isPending, error } = useMutation({
    mutationFn: onSubmit,
    onSuccess: (data) => {
      login(data.token, data.user);
      navigate('/dashboard');
    },
  });

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'calc(100vh - 150px)' }}>
      <Card style={{ width: 400 }}>
        <Title level={2} style={{ textAlign: 'center' }}>Admin Login</Title>
        <Form
          onSubmit={(values) => mutate(values)}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              {error && <Alert message={(error as any).response?.data?.message || 'Login failed'} type="error" style={{ marginBottom: 24 }} />}
              <Field name="email" initialValue="admin@example.com">
                {({ input, meta }) => (
                  <AntdForm.Item
                    label="Email"
                    validateStatus={meta.touched && meta.error ? 'error' : ''}
                    help={meta.touched && meta.error}
                  >
                    <Input {...input} type="email" placeholder="Email" />
                  </AntdForm.Item>
                )}
              </Field>
              <Field name="password" initialValue="password123">
                {({ input, meta }) => (
                  <AntdForm.Item
                    label="Password"
                    validateStatus={meta.touched && meta.error ? 'error' : ''}
                    help={meta.touched && meta.error}
                  >
                    <Input {...input} type="password" placeholder="Password" />
                  </AntdForm.Item>
                )}
              </Field>
              <AntdForm.Item>
                <Button type="primary" htmlType="submit" block loading={isPending}>
                  Log In
                </Button>
              </AntdForm.Item>
            </form>
          )}
        />
      </Card>
    </div>
  );
};
