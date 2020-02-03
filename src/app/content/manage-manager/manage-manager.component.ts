import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ManageUserService } from 'src/app/shared/services/manage-user.service';

@Component({
  selector: 'app-manage-manager',
  templateUrl: './manage-manager.component.html',
  styleUrls: ['./manage-manager.component.css']
})
export class ManageManagerComponent implements OnInit {

  display = false;
  formEmployee : FormGroup;
  constructor(private manageManagerSerivice : ManageUserService) { }

  ngOnInit() {
    this.initForm();
    this.manageManagerSerivice.getAllUsers().subscribe()
  }

  addManager(){
    this.display = true;
  }

  initForm(){
    this.formEmployee = new FormGroup({
      username : new FormControl(null),
      password : new FormControl(null),
      fname : new FormControl(null),
      lname : new FormControl(null),
      tel : new FormControl(null)
    })
  }

  submitFormEmployee(){
    console.log(this.formEmployee.getRawValue());
  }

}
