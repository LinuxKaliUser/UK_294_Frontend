import { Time } from "@angular/common";
import { DateSetting } from "./date-setting";
import { Remarks } from "./remarks";

export class Task {
  public id!: number;
  public designation = '';
  public sequence: number | undefined;
  public taskDuration : Time | undefined ;
  public dateSetting = new DateSetting();
  public remarks = new Remarks();

}
