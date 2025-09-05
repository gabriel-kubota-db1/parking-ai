import { Model, RelationMappings } from 'objection';
import { ParkingSessionModel } from '../parking-sessions/model.js';

export class ParkingSpotModel extends Model {
  static tableName = 'parking_spots';

  id!: number;
  spot_number!: number;
  is_occupied!: boolean;

  static relationMappings: RelationMappings = {
    activeSession: {
      relation: Model.HasOneRelation,
      modelClass: ParkingSessionModel,
      join: {
        from: 'parking_spots.id',
        to: 'parking_sessions.spot_id',
      },
      filter: (query) => query.where('is_active', true),
    },
  };
}
