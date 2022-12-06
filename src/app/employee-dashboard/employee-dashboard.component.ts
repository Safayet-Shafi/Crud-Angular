import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { EmployeeModel } from './employee-dashboard.model';



@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {

  formValue :FormGroup;
  employeeModelobj : EmployeeModel =new EmployeeModel();
  employeedata:any;
  showAdd:boolean;
  showUpdate:boolean;

  constructor(private Formbuilder:FormBuilder ,
    private api :ApiService) { }

  ngOnInit(): void {
     this.formValue = this.Formbuilder.group({
       firstName :[''],
       lirstName :[''],
       email :[''],
       mobile :[''],
       salary :['']
     })
     this.getAllEmployee()
     
  }
  clickAddEmployee(){
    this.formValue.reset();
    this.showAdd=true;
    this.showUpdate=false;
  }
  postEmployeeDetails(){
    this.employeeModelobj.firstName = this.formValue.value.firstName;
    this.employeeModelobj.lirstName=this.formValue.value.lirstName;
    this.employeeModelobj.email=this.formValue.value.email;
    this.employeeModelobj.mobile=this.formValue.value.mobile;
    this.employeeModelobj.salary=this.formValue.value.salary;

    this.api.postEmployee(this.employeeModelobj)
     .subscribe(res=>{
      // console.log(res)
      alert('data added')
      let ref = document.getElementById('cancel')
      ref?.click()
      this.formValue.reset()
      this.getAllEmployee()
     
      },
      err=>{
        alert('No data added')
      })

    }


    getAllEmployee(){
      this.api.getEmployee()
      .subscribe(res=>{
        this.employeedata=res;
        this.formValue.reset();
      })
      
  
  
  
    }
    deleteemployee1(row:any){
      
      this.api.deleteEmployee(row.employeeId)
      .subscribe(res=>{
        alert('user deleted');
        this.getAllEmployee()
        
      },err=>{
        console.log(err)
      })
    }
    onEdit(row:any){
      this.showAdd=false;
      this.showUpdate=true;

      this.employeeModelobj.employeeId=row.employeeId;
      this.formValue.controls['firstName'].setValue(row.firstName)
      this.formValue.controls['lirstName'].setValue(row.lirstName)
      this.formValue.controls['email'].setValue(row.email)
      this.formValue.controls['mobile'].setValue(row.mobile)
      this.formValue.controls['salary'].setValue(row.salary)
    }
    updateEmployee(){
      this.employeeModelobj.firstName = this.formValue.value.firstName;
      this.employeeModelobj.lirstName=this.formValue.value.lirstName;
      this.employeeModelobj.email=this.formValue.value.email;
      this.employeeModelobj.mobile=this.formValue.value.mobile;
      this.employeeModelobj.salary=this.formValue.value.salary;

      this.api.updateEmployee(this.employeeModelobj,this.employeeModelobj.employeeId)
      .subscribe(res=>{
        alert('updated successfully')
        let ref = document.getElementById('cancel')
      ref?.click()
      this.formValue.reset()
      this.getAllEmployee()
      })

    }
    
  }




  


