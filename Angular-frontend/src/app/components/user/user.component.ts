import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit {
  userForm: FormGroup;
  users: any[] = [];
  editingUserId: number | null = null;

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
      const userData = this.userForm.value;

      if (this.editingUserId) {
        this.userService.updateUser(this.editingUserId, userData).subscribe({
          next: () => {
            alert('User updated!');
            this.editingUserId = null;
            this.userForm.reset();
            this.ngOnInit();
          },
          error: (err) => alert('Error: ' + err.message)
        });
      } else {
        this.userService.addUser(userData).subscribe({
          next: () => {
            alert('User added!');
            this.userForm.reset();
            this.ngOnInit();
          },
          error: (err) => alert('Error: ' + err.message)
        });
      }
    }
  }

  editUser(user: any) {
    this.userForm.patchValue({
      name: user.name,
      email: user.email,
      password: ''
    });
    this.editingUserId = user.id;
  }

  deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe({
      next: () => {
        this.users = this.users.filter(u => u.id !== id);
        alert('User deleted!');
      },
      error: (err) => alert('Error: ' + err.message)
    });
  }

}
