import { gql } from "@apollo/client";

export const CREATE_CLINIC_ADDRESS = gql`
  mutation CreateClinicAddress($input: clinic_addresses_insert_input!) {
    insert_clinic_addresses_one(object: $input) {
      id
      address
      phone
      google_map_link
    }
  }
`;