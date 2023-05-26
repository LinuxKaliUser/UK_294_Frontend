import { DateSetting } from "./date-setting";
import { Remarks } from "./remarks";
import { Task } from "./task";

export class Person {
  public id!: number;
  public name = '';
  public sequence: number | undefined;
  public task = new Task();
  public dateSetting = new DateSetting();
  public remarks = new Remarks();

}
