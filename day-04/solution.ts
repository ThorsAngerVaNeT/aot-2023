export type Address = { address: string; city: string };

export type PresentDeliveryList<T extends Record<string, any>> = {
  [key in keyof T]: Address
};
