import Joi from 'joi';

export const parkVehicleSchema = Joi.object({
  spotId: Joi.number().integer().required(),
  vehiclePlate: Joi.string().trim().min(1).max(10).required(),
});

export const unparkVehicleSchema = Joi.object({
  spotId: Joi.number().integer().required(),
});
