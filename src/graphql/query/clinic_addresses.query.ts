import { gql } from "@apollo/client";

export const GET_ALL_CLINIC_ADDRESSES = gql`
  query GetAllClinicAddresses {
    clinic_addresses {
      id
      address
      phone
      google_map_link
    }
  }
`;

export const GET_CLINIC_ADDRESS_BY_ID = gql`
  query GetClinicAddressById($id: uuid!) {
    clinic_addresses_by_pk(id: $id) {
      id
      address
      phone
      google_map_link
    }
  }
`;

export const GET_FILTERED_CLINIC_ADDRESSES = gql`
  query GetAllClinicAddresses(
    $where: clinic_addresses_bool_exp!
    $offset: Int
    $limit: Int
  ) {
    clinic_addresses(where: $where, offset: $offset, limit: $limit) {
      id
      address
      phone
      google_map_link
      township
      name
    }
    clinic_addresses_aggregate(where: $where) {
      aggregate {
        count
      }
    }
  }
`;
