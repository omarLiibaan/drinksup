import { Component, OnInit } from '@angular/core';
import { ToastController, NavController} from '@ionic/angular';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  public enregistrerForm: FormGroup;
  public baseURI = 'http://localhost/drinksupProject/serveur/';

  constructor(private formBuilder: FormBuilder, private navCtrl: NavController, private toastCtrl: ToastController, public http: HttpClient) {
    this.enregistrerForm = new FormGroup({
        PRO_NOM: new FormControl(),
        PRO_PRENOM: new FormControl(),
        PRO_EMAIL: new FormControl(),
        PRO_PASSWORD: new FormControl(),
        CONFIRM_PRO_PASSWORD: new FormControl(),
    });
    this.validationForm();
  }
    validationForm() {
        this.enregistrerForm = this.formBuilder.group({
            'PRO_NOM': ['', Validators.required],
            'PRO_PRENOM': ['', Validators.required],
            'PRO_EMAIL': ['', Validators.compose([Validators.maxLength(70), Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$'), Validators.required])],
            'PRO_PASSWORD': ['', Validators.compose([Validators.minLength(6), Validators.required])],
            'CONFIRM_PRO_PASSWORD': ['', Validators.compose([Validators.minLength(6), Validators.required])]
        }, {
            validator: this.MatchPassword // Inject the provider method
        });
    }
    private MatchPassword(AC: AbstractControl) {
        const PRO_PASSWORD = AC.get('PRO_PASSWORD').value; // to get value in input tag
        const CONFIRM_PRO_PASSWORD = AC.get('CONFIRM_PRO_PASSWORD').value; // to get value in input tag
        if (PRO_PASSWORD !== CONFIRM_PRO_PASSWORD) {
            AC.get('CONFIRM_PRO_PASSWORD').setErrors( { MatchPassword: true });
        } else {
            AC.get('CONFIRM_PRO_PASSWORD').setErrors(null);
        }
    }
    addProprio() {
        const PRO_NOM: string = this.enregistrerForm.controls['PRO_NOM'].value;
        const PRO_PRENOM: string = this.enregistrerForm.controls['PRO_PRENOM'].value;
        const PRO_EMAIL: string = this.enregistrerForm.controls['PRO_EMAIL'].value;
        const PRO_PASSWORD: string = this.enregistrerForm.controls['PRO_PASSWORD'].value;
        // sign up
        this.signUpOwners(PRO_NOM, PRO_PRENOM, PRO_EMAIL, PRO_PASSWORD);
    }
    signUpOwners(nom: string, prenom: string, email: string, mdp: string) {
        const headers: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
              options: any		= { 'key' : 'enregistrerUser', 'PRO_NOM': nom, 'PRO_PRENOM': prenom, 'PRO_EMAIL': email, 'PRO_PASSWORD': mdp},
              url: any      	= this.baseURI + 'aksi.php';

        this.http.post(url, JSON.stringify(options), headers).subscribe((data: any) => {
                this.sendNotification('Félicitations!');
                this.navCtrl.navigateForward('login');
            },
            (error: any) => {
                console.log(error);
                this.sendNotification('Erreur!');
            });
    }

  ngOnInit() {
  }
    formLogin() {this.navCtrl.navigateForward('login'); }
    /*addProprio() {
      // Validation des champs
      if (this.PRO_NOM === '') {
          this.toastMessage('Le nom est requis');
      } else if (this.PRO_PRENOM === '') {
          this.toastMessage('Le prénom est requis');
      } else if (this.PRO_EMAIL === '') {
          this.toastMessage('Adresse mail est requis');
      } else if (this.PRO_PASSWORD === '') {
          this.toastMessage('Le mot de passe est requis');
      } else if (this.PRO_PASSWORD !== this.CONFIRM_PRO_PASSWORD) {
          this.toastMessage('Mot de passe invalide');
      } else {
        const body = {
          PRO_NOM: this.PRO_NOM,
          PRO_PRENOM: this.PRO_PRENOM,
          PRO_EMAIL: this.PRO_EMAIL,
          PRO_PASSWORD: this.PRO_PASSWORD,
          aksi: 'add_proprio'
        };
        this.postProvider.postData(body, 'aksi.php').subscribe( (data) => {
            const alertpesan = 'error';
            console.log(body);
            if (data) {
                this.navCtrl.navigateForward('login');
                this.toastMessage('Enregistrement validé');
            } else {
                this.toastMessage(alertpesan);
            }
        });
      }
    }*/

    async sendNotification(msg: string) {
        const toast = await this.toastCtrl.create({
            message: msg,
            duration: 3000,
            position: 'bottom'
        });
        toast.present();
    }
}
