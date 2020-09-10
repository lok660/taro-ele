export interface Address {
  id: string;
  city: string;
  address: string;
  address_detail: string;
  lotitude: string;
  name: string;
  phone: string;
  sex: string;
}

export interface Reducers {
  currentAddress: Address;
  userAddress: Address;
  userAddressList: Address[];
  token: string;
}
