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
  // public baseURI = 'http://localhost/drinksupProject/serveur/';
  public baseURI = 'https://macfi.ch/serveur/';
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
                this.formLogin();
            },
            (error: any) => {
                console.log(error);
                this.sendNotification('Erreur!');
            });
    }

  ngOnInit() {
  }
    formLogin() {this.navCtrl.navigateForward('login'); }
    mdpOublier(){this.navCtrl.navigateForward('login'); }
    async sendNotification(msg: string) {
        const toast = await this.toastCtrl.create({
            message: msg,
            duration: 3000,
            position: 'bottom'
        });
        toast.present();
    }
}
