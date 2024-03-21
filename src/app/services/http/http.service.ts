import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface QueryParam {
  [key: string]: any;
}

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    private http: HttpClient
  ) { }

  get<returnType>(
    baseUrl: string,
    endpoints: String,
    id: number | null = null,
    queryParam: QueryParam = {}
  ): Observable<returnType> {
    return this.http.get(
      `${baseUrl}/${endpoints}${id ? `/${id}` : ''}${this.modifier(queryParam)}`
    ) as Observable<returnType>;
  }

  post<returnType>(
    baseUrl: string,
    endpoints: String,
    id: number | null = null,
    queryParam: QueryParam = {},
    body: any = {}
  ): Observable<returnType> {
    return this.http.post(
      `${baseUrl}/${endpoints}${id ? `/${id}` : ''}${this.modifier(queryParam)}`, body
    ) as Observable<returnType>;
  }

  put<returnType>(
    baseUrl: string,
    endpoints: String,
    id: number | null = null,
    queryParam: QueryParam = {},
    body: any = {}
  ): Observable<returnType> {
    return this.http.put(
      `${baseUrl}/${endpoints}${id ? `/${id}` : ''}${this.modifier(queryParam)}`, body
    ) as Observable<returnType>;
  }

  delete<returnType>(
    baseUrl: string,
    endpoints: String,
    id: number | null = null,
  ): Observable<returnType> {
    return this.http.delete(
      `${baseUrl}/${endpoints}/${id}`
    ) as Observable<returnType>;
  }

  private modifier(query: QueryParam): string {
    if (query === null) {
      return '';
    }
    const queryAsString = this.mapQueryParamToUrl(query);
    return queryAsString.length === 0 ? '' : `?${queryAsString.join('&')}`;
  }

  private mapQueryParamToUrl(query: QueryParam): Array<string> {
    return Object.keys(query).map((key: string) => `${key}=${query[key]}`);
  }
}
