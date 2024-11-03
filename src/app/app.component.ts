import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { EmployeeModel } from './model/Employee';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'angular-crud';

  employeeForm: FormGroup = new FormGroup({});
  employeeObj: EmployeeModel = new EmployeeModel();
  employeeList: EmployeeModel[] = [];

  constructor() {
    this.createForm();
    const oldData = localStorage.getItem('EmpData');
    if (oldData != null) {
      const parserData = JSON.parse(oldData);
      this.employeeList = parserData;
    }
  }

  reset() {
    this.employeeObj = new EmployeeModel();
    this.createForm();
  }

  createForm() {
    this.employeeForm = new FormGroup({
      empId: new FormControl(this.employeeObj.empId),
      name: new FormControl(this.employeeObj.name),
      city: new FormControl(this.employeeObj.city),
      address: new FormControl(this.employeeObj.address),
      contactNo: new FormControl(this.employeeObj.contactNo),
      emailId: new FormControl(this.employeeObj.emailId),
      pincode: new FormControl(this.employeeObj.pincode),
      state: new FormControl(this.employeeObj.state),
    });
  }

  onSave() {
    const oldData = localStorage.getItem('EmpData');
    if (oldData != null) {
      const parserData = JSON.parse(oldData);
      this.employeeForm.controls['empId'].setValue(parserData.length + 1);
      this.employeeList.unshift(this.employeeForm.value);
    } else {
      this.employeeList.unshift(this.employeeForm.value);
    }
    localStorage.setItem('EmpData', JSON.stringify(this.employeeList));
    this.reset();
  }

  onEdit(item: EmployeeModel) {
    this.employeeObj = item;
    this.createForm();
  }
  onUpdate() {
    let record = this.employeeList.find(
      (m) => m.empId == this.employeeForm.controls['empId'].value
    );
    if (record !== undefined) {
      record.address = this.employeeForm.controls['address'].value;
      record.name = this.employeeForm.controls['name'].value;
      record.contactNo = this.employeeForm.controls['contactNo'].value;
    }
    localStorage.setItem('EmpData', JSON.stringify(this.employeeList));
    this.employeeObj = new EmployeeModel();
    this.reset();
  }

  onErase(id: Number) {
    let isErase = confirm('Are you sure you want to delete ?');
    if (isErase) {
      let index = this.employeeList.findIndex((m) => m.empId == id);
      this.employeeList.splice(index, 1);
      localStorage.setItem('EmpData', JSON.stringify(this.employeeList));
    }
  }
}
