import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Meal } from '../dataaccess/meal';
import { HttpClient, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MealService {

  readonly backendUrl = 'meals';

  constructor(private http: HttpClient) {
  }

  public getList(): Observable<Meal[]> {
    return this.http.get<Meal[]>(environment.backendBaseUrl + this.backendUrl);
  }

  public getOne(id: number): Observable<Meal> {
    return this.http.get<Meal>(environment.backendBaseUrl + this.backendUrl + `/${id}`);
  }

  public update(meal: Meal): Observable<Meal> {
    return this.http.put<Meal>(environment.backendBaseUrl + this.backendUrl + `/${meal.id}`, meal);
  }

  public save(meal: Meal): Observable<Meal> {
    return this.http.post<Meal>(environment.backendBaseUrl + this.backendUrl, meal);
  }

  public delete(id: number): Observable<HttpResponse<string>> {
    return this.http.delete<string>(environment.backendBaseUrl + this.backendUrl + `/${id}`, {observe: 'response'});
  }
}
