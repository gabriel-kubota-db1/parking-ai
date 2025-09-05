import { Request, Response } from 'express';
import { ParkingSpotModel } from './model.js';

export const getAllSpots = async (req: Request, res: Response) => {
  try {
    const spots = await ParkingSpotModel.query()
      .withGraphFetched('activeSession')
      .orderBy('spot_number');
    res.json(spots);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch parking spots' });
  }
};
