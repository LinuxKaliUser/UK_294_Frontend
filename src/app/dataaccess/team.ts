import { Person } from "./person";

export class Team {
  public id!: number;
  public name = '';
  public totalMembers: number | undefined;
  public persons : Person[] | undefined ;
  public remarks = '';
}
