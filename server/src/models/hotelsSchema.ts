import mongoose from "mongoose";
import { locationEnum, capacityEnum, starRatingEnum, roomTypesEnum, amenitiesEnum } from "@abhiram2k03/hotel-common";

const hotelSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    location:{
        type: String,
        enum: locationEnum,
        required: true
    },
    pricePerNight: { 
        type: Number, 
        required: true 
    },
    capacity: { 
        type: Number, 
        enum: capacityEnum,
        required: true 
    },
    starRating: { 
        type: Number, 
        enum: starRatingEnum, 
        required: true 
    },
    amenities: { 
        type: [String], 
        enum: amenitiesEnum,
        required: true 
    },
    roomTypes: { 
        type: [String], 
        enum: roomTypesEnum,
        required: true 
    },
    // imageUrl: { 
    //     type: String, 
    //     required: true 
    // }
},
{
    timestamps: true // Add createdAt and updatedAt fields
}
);

const Hotel = mongoose.model("hotels", hotelSchema);
export default Hotel;
