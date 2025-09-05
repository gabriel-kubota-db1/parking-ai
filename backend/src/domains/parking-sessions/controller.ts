import { Request, Response } from 'express';
import { transaction } from 'objection';
import { ParkingSpotModel } from '../parking-spots/model.js';
import { ParkingSessionModel } from './model.js';
import { parkVehicleSchema, unparkVehicleSchema } from './validators.js';

export const parkVehicle = async (req: Request, res: Response) => {
  const { error } = parkVehicleSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const { spotId, vehiclePlate } = req.body;

  try {
    const updatedSpot = await transaction(
      ParkingSpotModel.knex(),
      async (trx) => {
        const spot = await ParkingSpotModel.query(trx)
          .findById(spotId)
          .forUpdate();

        if (!spot) {
          throw new Error('Parking spot not found');
        }
        if (spot.is_occupied) {
          throw new Error('Parking spot is already occupied');
        }

        await ParkingSessionModel.query(trx).insert({
          spot_id: spotId,
          vehicle_plate: vehiclePlate,
          hourly_rate: parseFloat(process.env.HOURLY_RATE || '5'),
        });

        return await ParkingSpotModel.query(trx)
          .patchAndFetchById(spotId, { is_occupied: true })
          .withGraphFetched('activeSession');
      }
    );

    res.status(201).json(updatedSpot);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const unparkVehicle = async (req: Request, res: Response) => {
  const { error } = unparkVehicleSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const { spotId } = req.body;

  try {
    let sessionDetails: any = {};

    const updatedSpot = await transaction(
      ParkingSpotModel.knex(),
      async (trx) => {
        const spot = await ParkingSpotModel.query(trx)
          .findById(spotId)
          .forUpdate();
        if (!spot) {
          throw new Error('Parking spot not found');
        }
        if (!spot.is_occupied) {
          throw new Error('Parking spot is not occupied');
        }

        const activeSession = await ParkingSessionModel.query(trx)
          .where({ spot_id: spotId, is_active: true })
          .first();

        if (!activeSession) {
          throw new Error('No active parking session found for this spot');
        }

        const checkInTime = new Date(activeSession.check_in_time).getTime();
        const checkOutTime = new Date().getTime();
        const durationHours = (checkOutTime - checkInTime) / (1000 * 60 * 60);
        const totalCost = Math.max(
          activeSession.hourly_rate,
          durationHours * activeSession.hourly_rate
        ).toFixed(2); // Charge for at least 1 hour

        await ParkingSessionModel.query(trx).findById(activeSession.id).patch({
          check_out_time: new Date().toISOString().slice(0, 19).replace('T', ' '),
          total_cost: parseFloat(totalCost),
          is_active: false,
        });
        
        sessionDetails = {
            vehiclePlate: activeSession.vehicle_plate,
            checkInTime: activeSession.check_in_time,
            checkOutTime: new Date().toISOString(),
            durationHours: durationHours.toFixed(2),
            totalCost: totalCost,
        };

        return await ParkingSpotModel.query(trx).patchAndFetchById(spotId, {
          is_occupied: false,
        });
      }
    );

    res.status(200).json({ updatedSpot, sessionDetails });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};
