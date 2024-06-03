import { useState } from "react";
import axios from "axios";
import {
  HotelData,
  locationEnum,
  starRatingEnum,
  roomTypesEnum,
} from "@abhiram2k03/hotel-common";
import { BACKEND_URL } from "../utils/secrets";
import Lottie from "lottie-react";
import travellerAnimation from "../assets/lottie/traveller.json";

export const HomePage = () => {
  const [hotels, setHotels] = useState<HotelData[]>([]);

  const [capacity, setCapacity] = useState<number>(1);
  const [location, setLocation] = useState<string>("");
  const [minBudget, setMinBudget] = useState<number>(0);
  const [maxBudget, setMaxBudget] = useState<number>(0);
  const [minRating, setMinRating] = useState<number>(0);
  const [roomType, setRoomType] = useState<string>("");

  const onClickHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const data = {
      capacity,
      location,
      minBudget,
      maxBudget,
      minRating,
      roomType,
    };
    console.log("Form Data:", data);

    try {
      const response = await axios.get(`${BACKEND_URL}/hotels/filter`, {
        params: data,
      });
      setHotels(response.data);
      console.log("Hotels Data:", response.data);
    } catch (error) {
      console.error("Error fetching hotels:", error);
    }
  };

  return (
    <div className="container mx-auto px-20">
      <div className="font-bold text-xl py-10">
        Relax, we've got you covered. Simply provide your preferences, and we'll
        present you with the hotel information tailored to your needs.
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="col-span-1 md:col-span-1 p-6 border border-gray-200 rounded-3xl shadow-2xl">
          <h2 className="text-xl font-semibold mb-4">Filters</h2>
          <div className="mb-4">
            <label htmlFor="capacity" className="block text-gray-700">
              Capacity
            </label>
            <input
              type="range"
              id="capacity"
              name="capacity"
              min={1}
              max={10}
              value={capacity}
              onChange={(e) => setCapacity(Number(e.target.value))}
              className="w-full"
            />
            <span>{capacity}</span>
          </div>
          <div className="mb-4">
            <label htmlFor="location" className="block text-gray-700">
              Location
            </label>
            <select
              id="location"
              name="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full border border-gray-300 rounded p-2"
            >
              <option value="">Select location</option>
              {locationEnum.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Budget</label>
            <input
              type="number"
              name="minBudget"
              min={0}
              value={minBudget}
              onChange={(e) => setMinBudget(Number(e.target.value))}
              className="w-full border border-gray-300 rounded p-2 mb-2"
            />
            <span> to </span>
            <input
              type="number"
              name="maxBudget"
              value={maxBudget}
              onChange={(e) => setMaxBudget(Number(e.target.value))}
              className="w-full border border-gray-300 rounded p-2"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="rating" className="block text-gray-700">
              Rating
            </label>
            <select
              id="rating"
              name="rating"
              value={minRating}
              onChange={(e) => setMinRating(Number(e.target.value))}
              className="w-full border border-gray-300 rounded p-2"
            >
              <option value="">Select min. rating</option>
              {starRatingEnum.map((rate) => (
                <option key={rate} value={rate}>
                  {rate}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="roomType" className="block text-gray-700">
              Room Type
            </label>
            <select
              id="roomType"
              name="roomType"
              value={roomType}
              onChange={(e) => setRoomType(e.target.value)}
              className="w-full border border-gray-300 rounded p-2"
            >
              <option value="">Select Room type</option>
              {roomTypesEnum.map((room) => (
                <option key={room} value={room}>
                  {room}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={onClickHandler}
            className="w-full bg-black text-white rounded p-2 hover:bg-black"
          >
            Get Hotels
          </button>
        </div>

        <div className="col-span-1 md:col-span-3 p-4">
          {hotels.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              
              {hotels.map((hotel) => (
                <div
                  key={hotel._id}
                  className="border border-gray-200 rounded-lg p-4 shadow-md"
                >
                  <h3 className="text-lg font-bold mb-2">{hotel.name}</h3>
                  <p>Location: {hotel.location}</p>
                  <p>Price Per Night: ${hotel.pricePerNight}</p>
                  <p>Capacity: {hotel.capacity}</p>
                  <p>Rating: {hotel.starRating} stars</p>
                  <p>Amenities: {hotel.amenities.join(", ")}</p>
                  <p>Room Types: {hotel.roomTypes.join(", ")}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="w-1/2 h-96 flex items-center justify-center">
                <Lottie loop animationData={travellerAnimation} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
