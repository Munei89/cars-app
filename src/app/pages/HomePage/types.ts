export interface HomePageState {
  cars: ICar[];
  loading: boolean;
  error: boolean;
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
