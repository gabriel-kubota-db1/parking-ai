import { Modal, Button, Input, Form as AntdForm, message } from 'antd';
import { Form, Field } from 'react-final-form';
import { useMutation } from '@tanstack/react-query';
import api from '../../../http/axios';

const parkVehicle = async (values: { spotId: number; vehiclePlate: string }) => {
  const { data } = await api.post('/parking-sessions/park', values);
  return data;
};

export const ParkVehicleModal = ({ spot, isOpen, onClose, onSuccess }: { spot: any, isOpen: boolean, onClose: () => void, onSuccess: () => void }) => {
  const { mutate, isPending } = useMutation({
    mutationFn: parkVehicle,
    onSuccess: () => {
      message.success(`Vehicle parked successfully in spot ${spot.spot_number}`);
      onSuccess();
    },
    onError: (error: any) => {
      message.error(error.response?.data?.message || 'Failed to park vehicle');
    },
  });

  const handleFormSubmit = (values: { vehiclePlate: string }) => {
    mutate({ spotId: spot.id, vehiclePlate: values.vehiclePlate });
  };

  return (
    <Modal
      title={`Park Vehicle in Spot ${spot?.spot_number}`}
      open={isOpen}
      onCancel={onClose}
      footer={null}
    >
      <Form
        onSubmit={handleFormSubmit}
        render={({ handleSubmit, form }) => (
          <form
            onSubmit={async (event) => {
              await handleSubmit(event);
              form.reset();
            }}
          >
            <Field name="vehiclePlate" validate={(value) => (value ? undefined : 'Required')}>
              {({ input, meta }) => (
                <AntdForm.Item
                  label="Vehicle Plate"
                  validateStatus={meta.touched && meta.error ? 'error' : ''}
                  help={meta.touched && meta.error}
                >
                  <Input {...input} placeholder="e.g., ABC-1234" />
                </AntdForm.Item>
              )}
            </Field>
            <AntdForm.Item style={{ textAlign: 'right', marginBottom: 0 }}>
              <Button onClick={onClose} style={{ marginRight: 8 }}>
                Cancel
              </Button>
              <Button type="primary" htmlType="submit" loading={isPending}>
                Park Vehicle
              </Button>
            </AntdForm.Item>
          </form>
        )}
      />
    </Modal>
  );
};
