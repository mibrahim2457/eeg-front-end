export class EegModel {
  signalFile: any;
  sampleRate: number;
  constructor(signalFile: any, sampleRate: number) {
    this.signalFile = signalFile;
    this.sampleRate = sampleRate;
  }
}
