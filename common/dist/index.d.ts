import z from 'zod';
export declare const hotelZodSchema: z.ZodObject<{
    _id: z.ZodOptional<z.ZodString>;
    name: z.ZodString;
    location: z.ZodString;
    pricePerNight: z.ZodNumber;
    capacity: z.ZodNumber;
    starRating: z.ZodNumber;
    amenities: z.ZodArray<z.ZodString, "many">;
    roomTypes: z.ZodArray<z.ZodString, "many">;
}, "strip", z.ZodTypeAny, {
    name: string;
    location: string;
    pricePerNight: number;
    capacity: number;
    starRating: number;
    amenities: string[];
    roomTypes: string[];
    _id?: string | undefined;
}, {
    name: string;
    location: string;
    pricePerNight: number;
    capacity: number;
    starRating: number;
    amenities: string[];
    roomTypes: string[];
    _id?: string | undefined;
}>;
export type HotelData = z.infer<typeof hotelZodSchema>;
export declare const locationEnum: string[];
export declare const capacityEnum: number[];
export declare const starRatingEnum: number[];
export declare const roomTypesEnum: string[];
export declare const amenitiesEnum: string[];
