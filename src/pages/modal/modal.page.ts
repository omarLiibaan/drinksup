import { Component, OnInit } from '@angular/core';
import {ModalController, NavController, NavParams, ToastController} from '@ionic/angular';
import {Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {UsersPage} from "../users/users.page";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {
  passedId = null;
  passedPrenom = null;
  passedNom = null;
  passedEmail = null;
  passedRoles = null;
  public modifierForm: FormGroup;
  // public baseURI = 'http://localhost/drinksupProject/serveur/';
  public baseURI = 'https://macfi.ch/serveur/';
  constructor(private formBuilder: FormBuilder, private route: Router, private navCtrl: NavController, private navParams: NavParams, private modalController: ModalController,  private toastCtrl: ToastController,  public http: HttpClient) {
    this.modifierForm = new FormGroup({
       nom: new FormControl(),
       prenom: new FormControl(),
       email: new FormControl(),
       role: new FormControl(),
       id: new FormControl(),
    });
    this.validationForm();
  }

  validationForm() {
    this.modifierForm = this.formBuilder.group({
       'nom': ['', Validators.required],
       'prenom': ['', Validators.required],
       'email': ['', Validators.compose([Validators.maxLength(70), Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$'), Validators.required])],
       'role': ['', Validators.required],
       'id' : ['', Validators.required],
    });
  }
  ngOnInit() {
    this.passedId = this.navParams.get('id');
    this.passedPrenom = this.navParams.get('prenom');
    this.passedNom = this.navParams.get('nom');
    this.passedEmail = this.navParams.get('email');
    this.passedRoles = this.navParams.get('role');
  }
  editUsers() {
    const nom: string = this.modifierForm.controls['nom'].value;
    const prenom: string = this.modifierForm.controls['prenom'].value;
    const email: string = this.modifierForm.controls['email'].value;
    const id: number = this.modifierForm.controls['id'].value;
    console.log(nom + prenom + email + id);
    // update users
    this.updateUsers(nom, prenom, email, id);

  }
  updateUsers(nom: string, prenom: string, email: string, id: number) {
      const headers: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
          options: any		= { 'key' : 'updateUser', 'nom': nom, 'prenom': prenom, 'email': email, 'id': id},
          url: any      	= this.baseURI + 'aksi.php';

      this.http.post(url, JSON.stringify(options), headers).subscribe((data: any) => {
              this.sendNotification('Votre modification a bien été pris en compte !');
              this.closeModal();
          },
          (error: any) => {
              console.log(error);
              this.sendNotification('Erreur!');
          });
  }

  async navTabs(msg: string) {
      this.route.navigateByUrl(msg);
  }
  closeModal() {
    this.modalController.dismiss();
    // this.usersPage.ngOnInit();
  }
  async sendNotification(msg: string) {
      const toast = await this.toastCtrl.create({
          message: msg,
          duration: 3000,
          position: 'bottom'
      });
      toast.present();
  }


}
