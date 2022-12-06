import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import{map} from 'rxjs/operators'


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) { }
  
  postEmployee(data:any){
    return this.http.post<any>("http://localhost:9004/api/employee",data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  getEmployee(){
    return this.http.get<any>("http://localhost:9004/api/employee")
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  updateEmployee(data:any,employeeId:number){
    return this.http.put<any>("http://localhost:9004/api/employee/"+employeeId,data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  deleteEmployee(employeeId:any){
    return this.http.delete<any>("http://localhost:9004/api/employee/"+employeeId)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
}
