import { Person } from "./person";

export class Team {
  public id!: number;
  public name = '';
  public totalMembers=0;
  public persons : Person[] | undefined ;
  public remarks = '';
}
