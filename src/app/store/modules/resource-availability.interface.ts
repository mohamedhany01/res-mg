export interface ResourceAvailability {
  availabilityTime?: string;
  resourceTime?: {
    serviceTime?: boolean;
    fixedTime?: boolean;
  };
  reservation?: {
    once?: boolean;
    multiple?: boolean;
  };
}
