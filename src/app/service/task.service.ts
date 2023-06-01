import { Injectable } from '@angular/core';
import { Task } from '../dataaccess/task';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  readonly backendUrl = 'task';

  constructor(private http: HttpClient) {
  }

  public getList(): Observable<Task[]> {
    return this.http.get<Task[]>(environment.backendBaseUrl + this.backendUrl+"s");
  }

  public getOne(id: number): Observable<Task> {
    return this.http.get<Task>(environment.backendBaseUrl + this.backendUrl + `/${id}`);
  }

  public update(task: Task): Observable<Task> {
    return this.http.put<Task>(environment.backendBaseUrl + this.backendUrl + `/${task.id}`, task);
  }

  public save(task: Task): Observable<Task> {
    return this.http.post<Task>(environment.backendBaseUrl + this.backendUrl, task);
  }

  public delete(id: number): Observable<HttpResponse<string>> {
    return this.http.delete<string>(environment.backendBaseUrl + this.backendUrl + `/${id}`, {observe: 'response'});
  }
}

