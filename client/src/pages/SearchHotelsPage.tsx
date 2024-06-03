import { HotelData } from "@abhiram2k03/hotel-common";
import { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../utils/secrets";
import Lottie from "lottie-react";
import searchAnimation from "../assets/lottie/search.json";

export const SearchHotelsPage = () => {
    const [hotels, setHotels] = useState<HotelData[]>([]);
    const [search, setSearch] = useState<string>("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    const onClickHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await axios.get(`${BACKEND_URL}/hotels/search`, {
                params: {
                    q: search,
                },
            });

            setHotels(response.data);
        } catch (error) {
            setError("Failed to fetch hotels");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-4"> 
            <div className="mb-4 flex justify-center items-center">
                <input
                    placeholder="Search..."
                    type="text"
                    id="search"
                    value={search}
                    onChange={handleSearchChange}
                    className="border rounded-full px-2 py-1 focus:outline-none focus:border-black w-1/2 h-10"
                />
                <button onClick={onClickHandler} className="ml-2 px-4 py-1 bg-black text-white rounded hover:bg-white hover:text-black focus:outline-none">Search</button> {/* Apply Tailwind CSS button styling */}
            </div>

            {loading && 
            <div className="flex justify-center">
              <div className="w-1/2 h-96 flex items-center justify-center">
                <Lottie loop animationData={searchAnimation} />
              </div>
            </div>}
            {error && <p className="text-red-500 flex items-center justify-center">{error}</p>} 

            <div>
                {hotels.length > 0 ? (
                    hotels.map((hotel, index) => (
                        <div key={index} className="flex justify-center items-center"> 
                        <div className="flex flex-col border rounded p-4 mb-4 w-1/2">
                            <h2 className="text-xl font-bold mb-2">{hotel.name}</h2> 
                            <p><span className="font-bold">Location:</span> {hotel.location}</p>
                            <p><span className="font-bold">Price per Night:</span> {hotel.pricePerNight}</p>
                            <p><span className="font-bold">Capacity:</span> {hotel.capacity}</p>
                            <p><span className="font-bold">Star Rating:</span> {hotel.starRating}</p>
                            <p><span className="font-bold">Amenities:</span> {hotel.amenities.join(', ')}</p>
                            <p><span className="font-bold">Room Types:</span> {hotel.roomTypes.join(', ')}</p>
                        </div>
                        </div>
                    ))
                ) : (
                    !loading && 
                    <div className="flex justify-center">
                    <div className="w-1/2 h-96 flex flex-col items-center justify-center">
                      <Lottie loop animationData={searchAnimation} />
                      {search ? <p>No results found</p> : <p>Search for hotels</p>}
                    </div>
                  </div>
                )}
            </div>
        </div>
    );
};
