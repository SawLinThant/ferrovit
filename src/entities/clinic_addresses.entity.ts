export interface ClinicAddress {
    id: string;
    address: string;
    phone: string;
    google_map_link: string;
    township: string;
    name: string
  }
  
  export interface CreateClinicAddressInput {
    address: string;
    phone: string;
    google_map_link: string;
    township: string;
    name: string;
  }

  export interface ClinicAddressResponse {
    clinic_addresses: ClinicAddress[];
    total_count: number;
  }
  