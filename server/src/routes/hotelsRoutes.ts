import { Router } from 'express';
import hotelControllers from '../controllers/hotelsControllers';

const { addHotel, getAllHotels, getHotel, sortHotels, filterHotels, searchHotels } = hotelControllers;
const hotelRoutes = Router();

hotelRoutes.post('/hotel', addHotel);
hotelRoutes.get('/hotels', getAllHotels);
hotelRoutes.get('/hotel/:id', getHotel); 
hotelRoutes.get('/hotels/filter', filterHotels);
hotelRoutes.get('/hotels/search', searchHotels);

export default hotelRoutes;
