export class Blessing {
  id: number;
  blessing: string;
  date: string; // YYYY-MM-DD
  language: string;

  constructor(id: number, blessing: string, date: string, language: string) {
    this.id = id;
    this.blessing = blessing;
    this.date = date;
    this.language = language;
  }
}
