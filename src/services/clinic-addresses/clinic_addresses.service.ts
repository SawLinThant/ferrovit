import { CreateClinicAddressInput, ClinicAddress } from '@/entities/clinic_addresses.entity';
import { ClinicAddressRepository } from './clinic_addresses.repository';

export class ClinicAddressService {
  private repository: ClinicAddressRepository;

  constructor(repository: ClinicAddressRepository) {
    this.repository = repository;
  }

  async getAllClinicAddresses(): Promise<ClinicAddress[]> {
    const clinicAddresses = await this.repository.fetchAllClinicAddresses();

    return clinicAddresses.map((address) => ({
      ...address,
      address: address.address.trim(),
      phone: address.phone.trim(),
      google_map_link: address.google_map_link.trim(),
    }));
  }

  async getClinicAddressById(id: string): Promise<ClinicAddress> {
    if (!id || typeof id !== 'string') {
      throw new Error('Invalid clinic address ID');
    }

    const clinicAddress = await this.repository.fetchClinicAddressById(id);
    if (!clinicAddress) {
      throw new Error(`Clinic address with ID ${id} not found`);
    }

    return clinicAddress;
  }

  async createClinicAddress(input: CreateClinicAddressInput): Promise<ClinicAddress> {
    if (!input.address || !input.phone || !input.google_map_link) {
      throw new Error('Address, phone, and Google Map link are required');
    }
    if (!/^\+?[1-9]\d{1,14}$/.test(input.phone)) {
      throw new Error('Invalid phone number format');
    }
    if (!input.google_map_link.startsWith('http')) {
      throw new Error('Google Map link must be a valid URL');
    }

    const sanitizedInput: CreateClinicAddressInput = {
      address: input.address.trim(),
      phone: input.phone.trim(),
      google_map_link: input.google_map_link.trim(),
    };

    return await this.repository.createClinicAddress(sanitizedInput);
  }
}