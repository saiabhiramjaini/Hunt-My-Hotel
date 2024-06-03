import z from 'zod';

export const hotelZodSchema = z.object({
    _id: z.string().optional(),
    name: z.string().min(1),
    location: z.string().min(1),
    pricePerNight: z.number().nonnegative(),
    capacity: z.number().int().min(1),
    starRating: z.number().int().min(1).max(5),
    amenities: z.array(z.string().min(1)),
    roomTypes: z.array(z.string().min(1)), 
    // imageUrl: z.string().url() // Ensure the image URL is a valid URL (uncomment if needed)
});

// Define the TypeScript type based on the Zod schema
export type HotelData = z.infer<typeof hotelZodSchema>;


// enums for input fields
export const locationEnum = ["Hyderabad", "Bangalore", "Chennai", "Mumbai", "Delhi"];
export const capacityEnum = [1,2,3,4,5,6,7,8,9,10];
export const starRatingEnum = [1, 2, 3, 4, 5];
export const roomTypesEnum = ["Deluxe", "Suite", "Single", "Double", "Triple"];
export const amenitiesEnum = ["Elevator", "Escalator", "Food", "24/7 Room Service", "Laundry", "Pool", "Wi-Fi"];