import { Request, Response } from "express";
import Hotel from "../models/hotelsSchema";
import { hotelZodSchema }  from "@abhiram2k03/hotel-common";

const addHotel = async (req: Request, res: Response) => {
    try {
        // Validate the request body using Zod schema
        const validation = hotelZodSchema.safeParse(req.body);

        if (!validation.success) {
            // If validation fails, return a 400 error with validation errors
            return res.status(400).json({
                message: "Validation failed",
                errors: validation.error.errors,
            });
        }

        // Destructure the validated data
        const { name, location, pricePerNight, capacity,starRating, amenities, roomTypes } = validation.data;

        // Create a new hotel instance
        const newHotel = new Hotel({
            name,
            location,
            pricePerNight,
            capacity,
            starRating,
            amenities,
            roomTypes,
        });

        // Save the new hotel to the database
        const savedHotel = await newHotel.save();

        // Return the saved hotel data with a 201 status
        return res.status(201).json(savedHotel);
    } catch (e) {
        console.error(e);
        return res.status(500).json("Internal Server Error");
    }
}


const getAllHotels = async(req: Request, res: Response)=>{
    try{
        const hotels = await Hotel.find({});
        return res.status(200).json(hotels);
    }
    catch(e){
        console.log(e);
        return res.status(500).json("Internal Server Error");
    }
}

const getHotel = async(req: Request, res: Response)=>{
    try{

    }
    catch(e){
        console.log(e);
        return res.status(500).json("Internal Server Error");
    }
}

const sortHotels = async(req: Request, res: Response)=>{
    try{

    }
    catch(e){
        console.log(e);
        return res.status(500).json("Internal Server Error");
    }
}

const filterHotels = async (req: Request, res: Response) => {
    try {
      const {
        capacity,
        location,
        minBudget,
        maxBudget,
        minRating,
        roomType,
      } = req.query;
  
      // Build query object dynamically based on provided filters
      const query: any = {};
  
      if (capacity) {
        query.capacity = { $gte: Number(capacity) };
      }
      if (location) {
        query.location = location;
      }
      if (minBudget && maxBudget) {
        query.pricePerNight = { $gte: Number(minBudget), $lte: Number(maxBudget) };
      } else if (minBudget) {
        query.pricePerNight = { $gte: Number(minBudget) };
      } else if (maxBudget) {
        query.pricePerNight = { $lte: Number(maxBudget) };
      }
      if (minRating) {
        query.starRating = { $gte: Number(minRating) };
      }
      if (roomType) {
        query.roomTypes = roomType;
      }
  
      const hotels = await Hotel.find(query);
  
      return res.status(200).json(hotels);
    } catch (e) {
      console.error(e);
      return res.status(500).json("Internal Server Error");
    }
  };

const searchHotels = async (req: Request, res: Response) => {
    try {
        const searchString = req.query.q as string || "";

        // Create a search query that looks for the search string in relevant fields
        const searchQuery = {
            $or: [
                { name: new RegExp(searchString, 'i') },
                { location: new RegExp(searchString, 'i') },
                { amenities: new RegExp(searchString, 'i') },
                { roomTypes: new RegExp(searchString, 'i') },
            ],
        };

        const hotels = await Hotel.find(searchQuery);
        return res.status(200).json(hotels);
    } catch (e) {
        console.error(e);
        return res.status(500).json("Internal Server Error");
    }
}


export default {addHotel, getAllHotels, getHotel, sortHotels, filterHotels, searchHotels};