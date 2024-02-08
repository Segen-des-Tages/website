import { Status } from "./status";

export class Platform {
  name: string;
  url: string;
  description: string;
  icon: string;
  color: string;
  status: Status;
  constructor(name: string, url: string, description: string, icon: string, color: string, status: Status) {
    this.name = name;
    this.url = url;
    this.description = description;
    this.icon = icon;
    this.color = color;
    this.status = status;
  }
}
