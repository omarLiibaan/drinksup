import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {ModalController, NavParams, ToastController} from '@ionic/angular';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';


@Component({
  selector: 'app-modal-schedule',
  templateUrl: './modal-schedule.page.html',
  styleUrls: ['./modal-schedule.page.scss'],
})
export class ModalSchedulePage implements OnInit {

  baseURI = 'https://macfi.ch/serveur/aksi.php';
  jourId : string;
  jour : string;
  hDeb : string;
  hFin : string;

  //form
  updateSched : FormGroup;


  constructor(private modalCtrl : ModalController, private navParam : NavParams, private toastCtrl : ToastController, private http : HttpClient) { 
    this.updateSched = new FormGroup({
      heureDebut: new FormControl(),
      heureFin: new FormControl()
    });
  }

  ngOnInit() {
    this.jourId = this.navParam.get('jourId');
    this.jour = this.navParam.get('jour');
    this.hDeb = this.navParam.get('hdeb');
    this.hFin = this.navParam.get('hfin');

    this.updateSched.get('heureDebut').setValue(this.hDeb);
    this.updateSched.get('heureFin').setValue(this.hFin);
  }

  validButton(){
    document.getElementById("submitBtn").click();
  }

  closeModal(){
    this.modalCtrl.dismiss();
  }

  editSched() {
    const hDeb: string = this.updateSched.controls['heureDebut'].value;
    const hFin: string = this.updateSched.controls['heureFin'].value;
    const jId: string = this.jourId;
    // Validation Bar to display for Users interface
    this.updateSchedule(jId, hDeb, hFin);
  }

  updateSchedule(idParam: string, hDebParam: string, hFinParam : string) {
    const headers: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
        options: any		= { 'key' : 'updateSched', 'jourId': idParam, 'heureDeb': hDebParam, 'heureFin': hFinParam},
        url: any      	= this.baseURI;
  
    this.http.post(url, JSON.stringify(options), headers).subscribe((data: any) => {
          this.modalCtrl.dismiss(); 
          this.sendNotification('Votre modification a bien été pris en compte !');
        },
        (error: any) => {
            console.log(error);
            this.sendNotification('Erreur!');
        });
  }

  async sendNotification(msg: string) {
    const toast = await this.toastCtrl.create({
        message: msg,
        duration: 2000,
        position: 'bottom'
    });
    toast.present();
}


}
