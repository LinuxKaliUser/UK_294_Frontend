import { DateSetting } from "./date-setting";
import { Remarks } from "./remarks";

export class Person {
  public id!: number;
  public name = '';
  public sequence: number | undefined;
  public cost : number | undefined;
  public dateSetting = new DateSetting();
  public remarks = new Remarks();

}
