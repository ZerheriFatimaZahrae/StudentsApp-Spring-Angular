import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Payment, Student} from "../model/students.model";
import {environment} from "../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  constructor(private httpClient:HttpClient) { }

  public getAllPayments() : Observable<Array<Payment>>{
    return this.httpClient.get<Array<Payment>>(` ${environment.backendHost}/payments`);
  }
  public getAllStudents() : Observable<Array<Student>>{
    return this.httpClient.get<Array<Student>>(`${environment.backendHost}/students`);
  }
  public getStudentPayment(code:string) : Observable<Array<Payment>>{
    return this.httpClient.get<Array<Payment>>(`${environment.backendHost}/students/${code}/payments`);
  }

}
