import { CreateClinicAddressInput, ClinicAddress } from "@/entities/clinic_addresses.entity";
import { CREATE_CLINIC_ADDRESS } from "@/graphql/mutation/clinic_addresses.mutation";
import { GET_ALL_CLINIC_ADDRESSES, GET_CLINIC_ADDRESS_BY_ID } from "@/graphql/query/clinic_addresses.query";
import {
  ApolloClient,
  ApolloError,
  ServerError,
  ServerParseError,
} from "@apollo/client";

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
        fetchPolicy: "network-only",
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