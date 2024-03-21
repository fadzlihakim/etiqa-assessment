import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private address: string = 'http://localhost:3000';
  private endpoints: string = 'user';

  constructor(
    private httpService: HttpService
  ) { }

  getUser(): Observable<any> {
    return this.httpService.get(
      this.address,
      this.endpoints,
      null,
      {}
    );
  }

  createUser(queryParam: any): Observable<any> {
    return this.httpService.post(
      this.address,
      this.endpoints,
      null,
      {},
      {
        ...queryParam
      }
    );
  }

  updateUser(queryParam: any): Observable<any> {
    return this.httpService.put(
      this.address,
      this.endpoints,
      null,
      {},
      {
        ...queryParam
      }
    );
  }

  deleteUser(id: number): Observable<any> {
    return this.httpService.delete(
      this.address,
      this.endpoints,
      id
    );
  }
}
