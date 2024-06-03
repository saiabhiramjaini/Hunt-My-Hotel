import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { HotelData, locationEnum, starRatingEnum, roomTypesEnum } from "@abhiram2k03/hotel-common";

export const HomePage = () => {
  const navigate = useNavigate();

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
      const response = await axios.get("http://localhost:8080/api/v1/hotels/filter", {
        params: data
      });
      setHotels(response.data);
      console.log("Hotels Data:", response.data);
    } catch (error) {
      console.error("Error fetching hotels:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center mb-8">HotelFinder</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Filters Section */}
        <div className="col-span-1 md:col-span-1 p-4 border border-gray-200 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Filters</h2>
          <div className="mb-4">
            <label htmlFor="capacity" className="block text-gray-700">Capacity</label>
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
            <label htmlFor="location" className="block text-gray-700">Location</label>
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
            <label htmlFor="rating" className="block text-gray-700">Rating</label>
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
            <label htmlFor="roomType" className="block text-gray-700">Room Type</label>
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
            className="w-full bg-blue-500 text-white rounded p-2 hover:bg-blue-600"
          >
            Get Hotels
          </button>
        </div>

        {/* Hotels List Section */}
        <div className="col-span-1 md:col-span-3 p-4">
          <h2 className="text-xl font-semibold mb-4">Hotel Results:</h2>
          {hotels.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {hotels.map((hotel) => (
                <div key={hotel.name} className="border border-gray-200 rounded-lg p-4 shadow-md">
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
            <p className="text-gray-500">No hotels found. Please adjust your filters.</p>
          )}
        </div>
      </div>

      <div className="mt-8 flex justify-center">
        <button
          onClick={() => navigate("/addHotel")}
          className="bg-green-500 text-white rounded p-2 hover:bg-green-600"
        >
          Add Hotel
        </button>
      </div>
    </div>
  );
};
