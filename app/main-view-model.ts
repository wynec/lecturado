import { Observable } from '@nativescript/core';
import { MeterReading, MeterReadingModel } from './models/meter-reading';

export class HelloWorldModel extends Observable {
  private _readings: Array<MeterReading> = [];
  private _address: string = '';
  private _currentReading: number = 0;
  private _previousReading: number = 0;

  constructor() {
    super();
  }

  get readings(): Array<MeterReading> {
    return this._readings;
  }

  get address(): string {
    return this._address;
  }

  set address(value: string) {
    if (this._address !== value) {
      this._address = value;
      this.notifyPropertyChange('address', value);
    }
  }

  get currentReading(): number {
    return this._currentReading;
  }

  set currentReading(value: number) {
    if (this._currentReading !== value) {
      this._currentReading = value;
      this.notifyPropertyChange('currentReading', value);
    }
  }

  get previousReading(): number {
    return this._previousReading;
  }

  set previousReading(value: number) {
    if (this._previousReading !== value) {
      this._previousReading = value;
      this.notifyPropertyChange('previousReading', value);
    }
  }

  onSaveReading() {
    if (!this._address || this._currentReading <= 0) {
      alert('Por favor complete todos los campos');
      return;
    }

    const consumption = MeterReadingModel.calculateConsumption(
      this._currentReading,
      this._previousReading
    );

    const reading: MeterReading = {
      id: Date.now().toString(),
      address: this._address,
      currentReading: this._currentReading,
      previousReading: this._previousReading,
      readingDate: new Date(),
      consumption: consumption
    };

    this._readings.unshift(reading);
    this.notifyPropertyChange('readings', this._readings);

    // Limpiar formulario
    this._address = '';
    this._currentReading = 0;
    this._previousReading = 0;
    this.notifyPropertyChange('address', '');
    this.notifyPropertyChange('currentReading', 0);
    this.notifyPropertyChange('previousReading', 0);

    alert('Lectura guardada exitosamente');
  }
}