
import Big from 'big.js';
export class Meal {
  public id!: number;
  public designation = '';
  public sequence: number | undefined;
  public cost : Big | undefined;
  public dateSetting ='';
  public remarks = '';

}
