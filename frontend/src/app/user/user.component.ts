import { Component, OnInit } from '@angular/core';

import { UserService } from '../service/user.service'
import { NgForm } from '@angular/forms';
import { User } from '../service/user'
declare var M: any;
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [UserService]
})
export class UserComponent implements OnInit {

  constructor(public userservice: UserService) { }

  ngOnInit(): void {
    this.refreshuserlist()
    this.resetForm()

  }

  resetForm(form?: NgForm) {
    if (form) {
      form.reset()
      this.userservice.selectedUser = {
        _id: "",
        name: "",
        address: "",
        location: "",
        phone: null
      }
    }
  }
  onSubmit(form: NgForm) {
    if (form.value._id == "") {
      this.userservice.postUser(form.value).subscribe((res) => {
        this.resetForm(form);
        this.refreshuserlist()
        M.toast({ html: "Saved sucessfully", classes: "rounded" })
      })
    }
    else {
      this.userservice.putUser(form.value).subscribe((res) => {
        this.resetForm(form);
        this.refreshuserlist()
        M.toast({ html: "Update sucessfully", classes: "rounded" })
      })
    }
  }
  refreshuserlist() {
    this.userservice.getuserList().subscribe((res) => {
      this.userservice.user = res as User[]
    })
  }

  onEdit(user: User) {
    this.userservice.selectedUser = user;
  }

  onDelete(_id:string, form:NgForm){
    if(confirm('Are you sure to delete this record ?')== true){
      this.userservice.deleteUser(_id).subscribe((res)=>{
        this.refreshuserlist();
        this.resetForm(form);
        M.toast({ html: "Delete sucessfully", classes: "rounded" })
      })
    }
  }

}
