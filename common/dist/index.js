"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.amenitiesEnum = exports.roomTypesEnum = exports.starRatingEnum = exports.capacityEnum = exports.locationEnum = exports.hotelZodSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.hotelZodSchema = zod_1.default.object({
    _id: zod_1.default.string().optional(),
    name: zod_1.default.string().min(1),
    location: zod_1.default.string().min(1),
    pricePerNight: zod_1.default.number().nonnegative(),
    capacity: zod_1.default.number().int().min(1),
    starRating: zod_1.default.number().int().min(1).max(5),
    amenities: zod_1.default.array(zod_1.default.string().min(1)),
    roomTypes: zod_1.default.array(zod_1.default.string().min(1)),
    // imageUrl: z.string().url() // Ensure the image URL is a valid URL (uncomment if needed)
});
// enums for input fields
exports.locationEnum = ["Hyderabad", "Bangalore", "Chennai", "Mumbai", "Delhi"];
exports.capacityEnum = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
exports.starRatingEnum = [1, 2, 3, 4, 5];
exports.roomTypesEnum = ["Deluxe", "Suite", "Single", "Double", "Triple"];
exports.amenitiesEnum = ["Elevator", "Escalator", "Food", "24/7 Room Service", "Laundry", "Pool", "Wi-Fi"];
