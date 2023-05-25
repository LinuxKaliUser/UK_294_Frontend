import { DateSetting } from "./date-setting";
import { Remarks } from "./remarks";

export class Meal {
  public id!: number;
  public designation = '';
  public sequence: number | undefined;
  public cost : number | undefined;
  public dateSetting = new DateSetting();
  public remarks = new Remarks();

}
