import { gql } from "@apollo/client";

export const CREATE_CLINIC_ADDRESS = gql`
  mutation CreateClinicAddress($input: clinic_addresses_insert_input!) {
    insert_clinic_addresses_one(object: $input) {
      id
      address
      phone
      google_map_link
      township
      name
    }
  }
`;

export const UPDATE_CLINIC_ADDRESS = gql`
  mutation UpdateClinicAddress($id: uuid!, $input: clinic_addresses_set_input!) {
    update_clinic_addresses_by_pk(pk_columns: {id: $id}, _set: $input) {
      id
      address
      phone
      google_map_link
      township
      name
    }
  }
`;