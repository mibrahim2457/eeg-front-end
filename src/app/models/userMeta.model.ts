import { EegModel } from './eeg.model';
export class UserMetaModel {
  age: number;
  gender: string;

  constructor (age, gender) {
    this.age = age;
    this.gender = gender;
  }
}
