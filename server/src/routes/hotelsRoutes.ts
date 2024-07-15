import { Router } from 'express';
import hotelControllers from '../controllers/hotelsControllers';

const { addHotel, filterHotels, searchHotels } = hotelControllers;
const hotelRoutes = Router();

hotelRoutes.post('/hotel', addHotel);
hotelRoutes.get('/hotels/filter', filterHotels);
hotelRoutes.get('/hotels/search', searchHotels);

export default hotelRoutes;
