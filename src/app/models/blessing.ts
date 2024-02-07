export class Blessing {
  id: number;
  blessing: string;
  date: Date;
  language: string;

  constructor(id: number, blessing: string, date: Date, language: string) {
    this.id = id;
    this.blessing = blessing;
    this.date = date;
    this.language = language;
  }
}
