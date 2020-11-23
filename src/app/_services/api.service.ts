import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class ApiService {

  constructor(private http: HttpClient) { }

  segmentVideoRequest(params) {
    return this.http.post(`${environment.apiUrl}/api/process-interval`, params);
  }

  videoCompilationRequest(params) {
    return this.http.post(`${environment.apiUrl}/api/combine-video`, params);
  }

}
