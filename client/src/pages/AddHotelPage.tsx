import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  HotelData,
  locationEnum,
  starRatingEnum,
  roomTypesEnum,
  amenitiesEnum,
} from "@abhiram2k03/hotel-common";
import { BACKEND_URL } from "../utils/secrets";

export const AddHotelPage = () => {
  const navigate = useNavigate();

  const [hotel, setHotel] = useState<HotelData>({
    name: "",
    location: "",
    pricePerNight: 0,
    capacity: 1,
    starRating: 1,
    amenities: [],
    roomTypes: [],
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(hotel);
    try {
      const response = await axios.post(`${BACKEND_URL}/hotel`, hotel);
      console.log("Hotel added successfully:", response.data);
      alert("Hotel details added successfully");
      navigate("/");
    } catch (error) {
      console.error("Error adding hotel:", error);
    }
  };

  return (
    <div>
      <div className="container mx-auto w-1/3 mt-10 rounded-3xl shadow-xl p-8">
        <div>
          <h1 className="text-4xl font-bold text-center mb-8">
            Upload Hotel Details
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-row gap-10">
              <div>
                <div className="mb-4">
                  <label htmlFor="name" className="block font-bold">
                    Name:
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={hotel.name}
                    onChange={(e) =>
                      setHotel({ ...hotel, name: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded p-2"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="location" className="block font-bold">
                    Location:
                  </label>
                  <select
                    id="location"
                    name="location"
                    value={hotel.location}
                    onChange={(e) =>
                      setHotel({ ...hotel, location: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded p-2"
                    required
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
                  <label htmlFor="pricePerNight" className="block font-bold">
                    Price Per Night:
                  </label>
                  <input
                    type="number"
                    id="pricePerNight"
                    name="pricePerNight"
                    value={hotel.pricePerNight}
                    onChange={(e) =>
                      setHotel({
                        ...hotel,
                        pricePerNight: Number(e.target.value),
                      })
                    }
                    className="w-full border border-gray-300 rounded p-2"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="capacity" className="block font-bold">
                    Capacity:
                  </label>
                  <input
                    type="number"
                    id="capacity"
                    name="capacity"
                    value={hotel.capacity}
                    onChange={(e) =>
                      setHotel({ ...hotel, capacity: Number(e.target.value) })
                    }
                    className="w-full border border-gray-300 rounded p-2"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="starRating" className="block font-bold">
                    Star Rating:
                  </label>
                  <select
                    id="starRating"
                    name="starRating"
                    value={hotel.starRating}
                    onChange={(e) =>
                      setHotel({ ...hotel, starRating: Number(e.target.value) })
                    }
                    className="w-full border border-gray-300 rounded p-2"
                    required
                  >
                    {starRatingEnum.map((rating) => (
                      <option key={rating} value={rating}>
                        {rating}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <div className="mb-4">
                  <label className="block font-bold">Amenities:</label>
                  {amenitiesEnum.map((amenity) => (
                    <div key={amenity} className="flex items-center mb-2">
                      <input
                        type="checkbox"
                        id={amenity}
                        name="amenities"
                        value={amenity}
                        checked={hotel.amenities.includes(amenity)}
                        onChange={(e) => {
                          const isChecked = e.target.checked;
                          const updatedAmenities = isChecked
                            ? [...hotel.amenities, e.target.value]
                            : hotel.amenities.filter(
                                (a) => a !== e.target.value
                              );
                          setHotel({ ...hotel, amenities: updatedAmenities });
                        }}
                        className="mr-2"
                      />
                      <label htmlFor={amenity}>{amenity}</label>
                    </div>
                  ))}
                </div>
                <div className="mb-4">
                  <label className="block font-bold">Room Types:</label>
                  {roomTypesEnum.map((roomType) => (
                    <div key={roomType} className="flex items-center mb-2">
                      <input
                        type="checkbox"
                        id={roomType}
                        name="roomTypes"
                        value={roomType}
                        checked={hotel.roomTypes.includes(roomType)}
                        onChange={(e) => {
                          const isChecked = e.target.checked;
                          const updatedRoomTypes = isChecked
                            ? [...hotel.roomTypes, e.target.value]
                            : hotel.roomTypes.filter(
                                (rt) => rt !== e.target.value
                              );
                          setHotel({ ...hotel, roomTypes: updatedRoomTypes });
                        }}
                        className="mr-2"
                      />
                      <label htmlFor={roomType}>{roomType}</label>
                    </div>
                  ))}
                </div>

              </div>
            </div>
            <button
                  type="submit"
                  className="w-full bg-black text-white rounded p-2 hover:bg-white hover:text-black"
                >
                  Add Hotel
                </button>
          </form>
        </div>
      </div>
    </div>
  );
};
