export interface HomePageState {
  cars: ICar[];
  loading: boolean;
  error: boolean;
  bookings: {
    loading: boolean;
    error: boolean;
    data: IBooking[];
  };
}

export interface ICar {
  id: number;
  car: string;
  car_model: string;
  car_color: string;
  car_model_year: number;
  car_vin: string;
  price: string;
  availability: boolean;
}

export interface IBooking {
  id: number;
  car_id: number;
  car: string;
  car_model: string;
  car_color: string;
  car_model_year: number;
  start_date: string;
  end_date: string;
  price: string;
  created_at: string;
  updated_at: string;
}
