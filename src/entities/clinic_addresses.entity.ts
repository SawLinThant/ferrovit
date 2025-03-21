export interface ClinicAddress {
    id: string;
    address: string;
    phone: string;
    google_map_link: string;
  }
  
  export interface CreateClinicAddressInput {
    address: string;
    phone: string;
    google_map_link: string;
  }