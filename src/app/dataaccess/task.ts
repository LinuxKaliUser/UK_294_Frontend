import { Time } from "@angular/common";

export class Task {
  public id!: number;
  public designation = '';
  public sequence: number | undefined;
  public taskDuration : Time | undefined ;
  public dateSetting ='';
  public remarks = '';

}
