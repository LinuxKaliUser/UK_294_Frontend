import { Injectable } from '@angular/core';
import { Team } from '../dataaccess/team';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  readonly backendUrl = 'team';

  constructor(private http: HttpClient) {
  }

  public getList(): Observable<Team[]> {
    return this.http.get<Team[]>(environment.backendBaseUrl + this.backendUrl);
  }

  public getOne(id: number): Observable<Team> {
    return this.http.get<Team>(environment.backendBaseUrl + this.backendUrl + `/${id}`);
  }

  public update(team: Team): Observable<Team> {
    return this.http.put<Team>(environment.backendBaseUrl + this.backendUrl + `/${team.id}`, team);
  }

  public save(team: Team): Observable<Team> {
    return this.http.post<Team>(environment.backendBaseUrl + this.backendUrl, team);
  }

  public delete(id: number): Observable<HttpResponse<string>> {
    return this.http.delete<string>(environment.backendBaseUrl + this.backendUrl + `/${id}`, {observe: 'response'});
  }
}
