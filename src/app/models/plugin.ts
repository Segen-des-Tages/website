export class Plugin {
  name: string;
  url: string;
  description: string;
  icon: string;
  color: string;
  status: string;
  constructor(name: string, url:string, description: string, icon: string, color: string, status: string) {
    this.name = name;
    this.url = url;
    this.description = description;
    this.icon = icon;
    this.color = color;
    this.status = status;
  }
}
