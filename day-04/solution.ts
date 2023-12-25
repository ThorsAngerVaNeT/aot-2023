type Address = { address: string; city: string };
type PresentDeliveryList<T extends Record<string, any>> = {
  [key in keyof T]: Address
};
