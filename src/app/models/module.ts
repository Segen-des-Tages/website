export class Module {
  name: string;
  link: string;
  description: string;
  icon: string;
  color: string;
  status: string;
  constructor(name: string, link:string, description: string, icon: string, color: string, status: string) {
    this.name = name;
    this.link = link;
    this.description = description;
    this.icon = icon;
    this.color = color;
    this.status = status;
  }
}
