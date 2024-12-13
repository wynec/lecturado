export interface MeterReading {
  id: string;
  address: string;
  currentReading: number;
  previousReading: number;
  readingDate: Date;
  consumption: number;
}

export class MeterReadingModel {
  static calculateConsumption(current: number, previous: number): number {
    return current - previous;
  }
}