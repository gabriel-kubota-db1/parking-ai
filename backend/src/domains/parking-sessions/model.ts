import { Model } from 'objection';

export class ParkingSessionModel extends Model {
  static tableName = 'parking_sessions';

  id!: number;
  spot_id!: number;
  vehicle_plate!: string;
  check_in_time!: string;
  check_out_time?: string;
  hourly_rate!: number;
  total_cost?: number;
  is_active!: boolean;
}
