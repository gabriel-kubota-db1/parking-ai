import React from 'react';
import { Layout, Button } from 'antd';
import { useAuth } from '../hooks/useAuth';
import { LogoutOutlined } from '@ant-design/icons';

const { Header, Content } = Layout;

export const PageLayout = ({ children }: { children: React.ReactNode }) => {
  const { user, logout } = useAuth();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ color: 'white', fontSize: '20px', fontWeight: 'bold' }}>
          Parking Lot System
        </div>
        {user && (
          <div>
            <span style={{ color: 'white', marginRight: '16px' }}>Welcome, {user.email}</span>
            <Button type="primary" icon={<LogoutOutlined />} onClick={logout}>
              Logout
            </Button>
          </div>
        )}
      </Header>
      <Content style={{ padding: '24px' }}>
        {children}
      </Content>
    </Layout>
  );
};
