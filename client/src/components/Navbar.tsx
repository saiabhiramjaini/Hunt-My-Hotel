import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <>
      <div>
        <div className="flex justify-between items-center place-content-between gap-10 w-screen h-20 bg-black text-white px-20">
          <Link to="/">
            <div className="font-bold text-2xl">Hunt My Hotel</div>
          </Link>
          <div className="flex gap-10">
          <Link to="/">
            <div className="font-bold">Home</div>
          </Link>
          <Link to="/addHotel">
            <div className="font-bold">Add Hotel</div>
          </Link>
          <Link to="/search">
            <div className="font-bold">Search Hotels</div>
          </Link>
          </div>
        </div>
      </div>
    </>
  );
};
