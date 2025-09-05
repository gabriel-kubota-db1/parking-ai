import { Modal, Descriptions, Typography, Button } from 'antd';
import dayjs from 'dayjs';

const { Title, Text } = Typography;

export const CheckoutModal = ({ details, isOpen, onClose }: { details: any, isOpen: boolean, onClose: () => void }) => {
  if (!details) return null;

  return (
    <Modal
      title="Checkout Successful"
      open={isOpen}
      onCancel={onClose}
      footer={[
        <Button key="close" type="primary" onClick={onClose}>
          Close
        </Button>
      ]}
    >
      <Descriptions bordered column={1}>
        <Descriptions.Item label="Vehicle Plate">{details.vehiclePlate}</Descriptions.Item>
        <Descriptions.Item label="Check-In Time">
          {dayjs(details.checkInTime).format('YYYY-MM-DD HH:mm:ss')}
        </Descriptions.Item>
        <Descriptions.Item label="Check-Out Time">
          {dayjs(details.checkOutTime).format('YYYY-MM-DD HH:mm:ss')}
        </Descriptions.Item>
        <Descriptions.Item label="Duration">
          {parseFloat(details.durationHours).toFixed(2)} hours
        </Descriptions.Item>
      </Descriptions>
      <div style={{ textAlign: 'center', marginTop: '24px' }}>
        <Title level={3}>Total to Charge</Title>
        <Text style={{ fontSize: '36px', color: '#52c41a', fontWeight: 'bold' }}>
          ${parseFloat(details.totalCost).toFixed(2)}
        </Text>
      </div>
    </Modal>
  );
};
