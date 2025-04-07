import { CreateClinicAddressInput, ClinicAddress, ClinicAddressResponse } from "@/entities/clinic_addresses.entity";
import { CREATE_CLINIC_ADDRESS, UPDATE_CLINIC_ADDRESS } from "@/graphql/mutation/clinic_addresses.mutation";
import { GET_ALL_CLINIC_ADDRESSES, GET_CLINIC_ADDRESS_BY_ID, GET_FILTERED_CLINIC_ADDRESSES } from "@/graphql/query/clinic_addresses.query";
import {
  ApolloClient,
  ApolloError,
  ServerError,
  ServerParseError,
} from "@apollo/client";

interface FetchAddressParams {
  township?: string;
  offset?: number;
  limit?: number;
}

export class ClinicAddressRepository {
  private client: ApolloClient<any>;

  constructor(client: ApolloClient<any>) {
    this.client = client;
  }

  async fetchAllClinicAddresses(): Promise<ClinicAddress[]> {
    try {
      const { data } = await this.client.query<{ clinic_addresses: ClinicAddress[] }>({
        query: GET_ALL_CLINIC_ADDRESSES,
        fetchPolicy: "network-only",
      });
      return data.clinic_addresses;
    } catch (error) {
      throw new ApolloError({
        errorMessage: "Failed to fetch all clinic addresses",
        graphQLErrors: error instanceof ApolloError ? error.graphQLErrors : [],
        networkError: this.getNetworkError(error),
      });
    }
  }

  async fetchClinicAddressById(id: string): Promise<ClinicAddress | null> {
    try {
      const { data } = await this.client.query<{ clinic_addresses_by_pk: ClinicAddress | null }>({
        query: GET_CLINIC_ADDRESS_BY_ID,
        variables: { id },
        fetchPolicy: "no-cache",
      });
      return data.clinic_addresses_by_pk;
    } catch (error) {
      throw new ApolloError({
        errorMessage: `Failed to fetch clinic address with ID: ${id}`,
        graphQLErrors: error instanceof ApolloError ? error.graphQLErrors : [],
        networkError: this.getNetworkError(error),
      });
    }
  }

  async fetchClinic({
        township,
        offset = 0,
        limit = 10,
      }: FetchAddressParams): Promise<ClinicAddressResponse> {
        try {
          const where: any = {};
          if (township) {
            where.township = { _eq: township };
          }
    
          console.log('Fetching blogs with params:', {
            where,
            offset,
            limit,
          });
    
          const { data } = await this.client.query<{
            clinic_addresses: ClinicAddress[];
            clinic_addresses_aggregate: { aggregate: { count: number } };
          }>({
            query: GET_FILTERED_CLINIC_ADDRESSES,
            variables: {
              where,
              offset,
              limit,
            },
            fetchPolicy: "no-cache",
            errorPolicy: "all",
          });
    
          if (!data?.clinic_addresses) {
            throw new Error("No addresses returned from query");
          }
    
          return {
            clinic_addresses: data.clinic_addresses,
            total_count: data.clinic_addresses_aggregate.aggregate.count,
          };
        } catch (error) {
          console.error('Error fetching addresses:', error);
          throw new ApolloError({
            errorMessage: "Failed to fetch addresses",
            graphQLErrors: error instanceof ApolloError ? error.graphQLErrors : [],
            networkError: error instanceof ApolloError ? error.networkError : null,
          });
        }
      }

  async createClinicAddress(input: CreateClinicAddressInput): Promise<ClinicAddress> {
    try {
      const { data } = await this.client.mutate<{
        insert_clinic_addresses_one: ClinicAddress;
      }>({
        mutation: CREATE_CLINIC_ADDRESS,
        variables: { input },
      });

      if (!data?.insert_clinic_addresses_one) {
        throw new Error("Clinic address creation returned no data");
      }

      return data.insert_clinic_addresses_one;
    } catch (error) {
      throw new ApolloError({
        errorMessage: "Failed to create clinic address",
        graphQLErrors: error instanceof ApolloError ? error.graphQLErrors : [],
        networkError: this.getNetworkError(error),
      });
    }
  }

  async updateClinicAddress(id: string, input: Partial<ClinicAddress>): Promise<ClinicAddress> {
    try {
      const { data } = await this.client.mutate<{
        update_clinic_addresses_by_pk: ClinicAddress;
      }>({
        mutation: UPDATE_CLINIC_ADDRESS,
        variables: { id, input },
      });

      if (!data?.update_clinic_addresses_by_pk) {
        throw new Error("Clinic address update returned no data");
      }

      return data.update_clinic_addresses_by_pk;
    } catch (error) {
      throw new ApolloError({
        errorMessage: "Failed to update clinic address",
        graphQLErrors: error instanceof ApolloError ? error.graphQLErrors : [],
        networkError: this.getNetworkError(error),
      });
    }
  }

  private getNetworkError(
    error: unknown
  ): Error | ServerError | ServerParseError | null {
    if (error instanceof ApolloError) {
      return error.networkError;
    }
    if (error instanceof Error) {
      return error;
    }
    if (typeof error === "string") {
      return new Error(error);
    }
    if (error && typeof error === "object" && "message" in error) {
      return new Error((error as { message: string }).message);
    }
    return null;
  }
}