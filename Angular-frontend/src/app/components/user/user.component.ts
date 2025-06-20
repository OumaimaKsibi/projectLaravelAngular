import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent  implements OnInit {
 userForm: FormGroup;
  users: any[] = [];

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }
ngOnInit() {
     this.userService.getUsers().subscribe({
    next: (data) => {
      this.users = data as any[];
    },
    error: (error) => console.error(error)
  });
  }
  onSubmit() {
    if (this.userForm.valid) {
      this.userService.addUser(this.userForm.value).subscribe({
        next: (res) => alert('User added!'),
        error: (err) => alert('Error: ' + err.message)
      });
    }
  }
}
