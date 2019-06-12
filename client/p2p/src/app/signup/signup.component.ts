import { baseURL } from './../shared/baseurl';
import { Router } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { User } from './../shared/user';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

    test : Date = new Date();
    focus;
    focus1;
    focus2;
    signUpForm: FormGroup;
    user: User;
    selectedFile: File;

    @ViewChild('sform') signUpFormDirective;

    constructor(private fb: FormBuilder,
        private authService: AuthService,
        private router: Router) { }

    createForm() {
        this.signUpForm = this.fb.group({
            username: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(8)]],
            confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
            firstname: ['', Validators.required],
            lastname: ['', Validators.required],
            description: ['', Validators.required],
            birthday: ['', Validators.required],
            profilePic: ['', Validators.required]
        });
    }

    get username() { return this.signUpForm.get('username'); }
    get password() { return this.signUpForm.get('password'); }
    get confirmPassword() { return this.signUpForm.get('confirmPassword'); }
    get firstname() { return this.signUpForm.get('firstname'); }
    get lastname() { return this.signUpForm.get('lastname'); }
    get description() { return this.signUpForm.get('description'); }
    get birthday() { return this.signUpForm.get('birthday'); }
    get profilePic() { return this.signUpForm.get('profilePic'); }

    ngOnInit() {
        this.createForm();
    }

    onFileChanged(event) {
        this.selectedFile = event.target.files[0]
    }

    onSubmit() {
        this.user = this.signUpForm.value;
        const formData = new FormData();
        formData.append('profilePic', this.selectedFile, this.selectedFile.name);
        formData.append('username', this.user.username);
        formData.append('password', this.user.password);
        formData.append('firstname', this.user.firstname);
        formData.append('lastname', this.user.lastname);
        formData.append('description', this.user.description);
        formData.append('birthday', this.user.birthday);
        this.authService.signUp(formData)
        .subscribe(user => {
            console.log(user);
            this.router.navigate(['/home']);
        })
    }
}
