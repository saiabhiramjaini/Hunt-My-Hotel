import { HotelData } from "@abhiram2k03/hotel-common";
import { useState } from "react";
import axios from "axios";

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
            const response = await axios.get(`http://localhost:8080/api/v1/hotels/search`, {
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
        <div className="container mx-auto p-4"> {/* Apply Tailwind CSS container class */}
            <div className="mb-4"> {/* Apply Tailwind CSS margin bottom class */}
                <label htmlFor="search" className="mr-2">Search</label> {/* Apply Tailwind CSS margin right class */}
                <input
                    type="text"
                    id="search"
                    value={search}
                    onChange={handleSearchChange}
                    className="border rounded px-2 py-1 focus:outline-none focus:border-blue-500"
                />
                <button onClick={onClickHandler} className="ml-2 px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none">Search</button> {/* Apply Tailwind CSS button styling */}
            </div>

            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>} {/* Apply Tailwind CSS text color class */}

            <div>
                {hotels.length > 0 ? (
                    hotels.map((hotel, index) => (
                        <div key={index} className="border rounded p-4 mb-4"> {/* Apply Tailwind CSS border, rounded, padding and margin bottom class */}
                            <h2 className="text-xl font-bold mb-2">{hotel.name}</h2> {/* Apply Tailwind CSS heading and font weight class */}
                            <p><span className="font-bold">Location:</span> {hotel.location}</p> {/* Apply Tailwind CSS font weight class */}
                            <p><span className="font-bold">Price per Night:</span> {hotel.pricePerNight}</p>
                            <p><span className="font-bold">Capacity:</span> {hotel.capacity}</p>
                            <p><span className="font-bold">Star Rating:</span> {hotel.starRating}</p>
                            <p><span className="font-bold">Amenities:</span> {hotel.amenities.join(', ')}</p>
                            <p><span className="font-bold">Room Types:</span> {hotel.roomTypes.join(', ')}</p>
                        </div>
                    ))
                ) : (
                    !loading && <p>No hotels found.</p>
                )}
            </div>
        </div>
    );
};
