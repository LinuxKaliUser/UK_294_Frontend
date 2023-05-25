import { Person } from "./person";
import { Remarks } from "./remarks";

export class Team {
  public id!: number;
  public name = '';
  public totalMembers: number | undefined;
  public persons : Person[] | undefined ;
  public remarks = new Remarks();
}
