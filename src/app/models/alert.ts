export const enum AlertType {
  failure,
  success
}
export class Alert {
  type: AlertType =  AlertType.failure;
  title: string = '';
  msg: string = '';
  closable: boolean = true;

  constructor(title: string, msg: string, type?: AlertType) {
    this.title = title;
    this.msg = msg;
    if (type) {
      this.type = type;
    }
  }
}
