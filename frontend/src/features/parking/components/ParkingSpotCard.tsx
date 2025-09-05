import { Card, Button, Typography, Popconfirm, message } from 'antd';
import { CarOutlined, LoginOutlined, LogoutOutlined } from '@ant-design/icons';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../../http/axios';

const { Text, Title } = Typography;

const unparkVehicle = async (spotId: number) => {
  const { data } = await api.post('/parking-sessions/unpark', { spotId });
  return data;
};

export const ParkingSpotCard = ({ spot, onClick, onUnparkSuccess }: { spot: any, onClick: () => void, onUnparkSuccess: (details: any) => void }) => {
  const queryClient = useQueryClient();

  const { mutate: unpark, isPending: isUnparking } = useMutation({
    mutationFn: () => unparkVehicle(spot.id),
    onSuccess: (data) => {
      message.success(`Vehicle unparked from spot ${spot.spot_number}`);
      onUnparkSuccess(data.sessionDetails);
      queryClient.invalidateQueries({ queryKey: ['parkingSpots'] });
    },
    onError: (error: any) => {
      message.error(error.response?.data?.message || 'Failed to unpark vehicle');
    },
  });

  const cardStyle = {
    borderColor: spot.is_occupied ? '#f5222d' : '#52c41a',
    borderWidth: '2px',
    textAlign: 'center' as const,
  };

  return (
    <Card hoverable style={cardStyle} bodyStyle={{ padding: '16px' }}>
      <Title level={4} style={{ margin: 0 }}>Spot {spot.spot_number}</Title>
      <div style={{ fontSize: '32px', margin: '12px 0', color: spot.is_occupied ? '#f5222d' : '#52c41a' }}>
        <CarOutlined />
      </div>
      {spot.is_occupied ? (
        <>
          <Text strong>{spot.activeSession?.vehicle_plate}</Text>
          <br />
          <Popconfirm
            title="Unpark Vehicle?"
            description="Are you sure you want to check out this vehicle?"
            onConfirm={() => unpark()}
            okText="Yes"
            cancelText="No"
          >
            <Button
              type="primary"
              danger
              icon={<LogoutOutlined />}
              style={{ marginTop: '12px' }}
              loading={isUnparking}
            >
              Unpark
            </Button>
          </Popconfirm>
        </>
      ) : (
        <>
          <Text type="secondary">Available</Text>
          <br />
          <Button
            type="primary"
            icon={<LoginOutlined />}
            style={{ marginTop: '12px' }}
            onClick={onClick}
          >
            Park
          </Button>
        </>
      )}
    </Card>
  );
};
