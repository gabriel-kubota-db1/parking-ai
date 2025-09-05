import { useQuery } from '@tanstack/react-query';
import { Row, Col, Spin, Alert, Typography } from 'antd';
import api from '../../../http/axios';
import { ParkingSpotCard } from '../components/ParkingSpotCard';
import { useState } from 'react';
import { ParkVehicleModal } from '../components/ParkVehicleModal';
import { CheckoutModal } from '../components/CheckoutModal';

const { Title } = Typography;

const fetchParkingSpots = async () => {
  const { data } = await api.get('/parking-spots');
  return data;
};

export const ParkingDashboardPage = () => {
  const { data: spots, isLoading, error, refetch } = useQuery({
    queryKey: ['parkingSpots'],
    queryFn: fetchParkingSpots,
  });

  const [isParkModalVisible, setIsParkModalVisible] = useState(false);
  const [isCheckoutModalVisible, setIsCheckoutModalVisible] = useState(false);
  const [selectedSpot, setSelectedSpot] = useState<any>(null);
  const [checkoutDetails, setCheckoutDetails] = useState<any>(null);

  const handleCardClick = (spot: any) => {
    setSelectedSpot(spot);
    if (spot.is_occupied) {
      // This will be handled by the unpark mutation in the card
    } else {
      setIsParkModalVisible(true);
    }
  };

  const handleUnparkSuccess = (details: any) => {
    setCheckoutDetails(details);
    setIsCheckoutModalVisible(true);
    refetch();
  };

  if (isLoading) return <Spin size="large" />;
  if (error) return <Alert message="Error" description={(error as any).message} type="error" showIcon />;

  return (
    <>
      <Title level={2}>Parking Lot Status</Title>
      <Row gutter={[16, 16]}>
        {spots?.map((spot: any) => (
          <Col key={spot.id} xs={12} sm={8} md={6} lg={4}>
            <ParkingSpotCard spot={spot} onClick={() => handleCardClick(spot)} onUnparkSuccess={handleUnparkSuccess} />
          </Col>
        ))}
      </Row>
      <ParkVehicleModal
        spot={selectedSpot}
        isOpen={isParkModalVisible}
        onClose={() => setIsParkModalVisible(false)}
        onSuccess={() => {
          setIsParkModalVisible(false);
          refetch();
        }}
      />
      <CheckoutModal
        details={checkoutDetails}
        isOpen={isCheckoutModalVisible}
        onClose={() => setIsCheckoutModalVisible(false)}
      />
    </>
  );
};
