import { ModalController, ToastController, NavParams } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-modal-ratings',
  templateUrl: './modal-ratings.page.html',
  styleUrls: ['./modal-ratings.page.scss'],
})
export class ModalRatingsPage implements OnInit {
  public firstGlassClick : boolean = false
  public firstmousse : string = "0px";
  public firstliquid : string = "0px";
  //
  public secondGlassClick : boolean = false
  public secondmousse : string = "0px";
  public secondliquid : string = "0px";
  //
  public thirdGlassClick : boolean = false
  public thirdmousse : string = "0px";
  public thirdliquid : string = "0px";
  //
  public fourthGlassClick : boolean = false
  public fourthmousse : string = "0px";
  public fourthliquid : string = "0px";
  //
  public fifthGlassClick : boolean = false
  public fifthmousse : string = "0px";
  public fifthliquid : string = "0px";
  //
  public note : number = null;
  //
  public idENT;
  public idUSER;
  //
  baseURI = 'https://macfi.ch/serveur/aksi.php';


  constructor(private http : HttpClient, private modalCtrl : ModalController, private toastCtrl : ToastController, private navParams : NavParams) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.idENT = this.navParams.get("idEnt");
    this.idUSER = this.navParams.get("idUser");
  }

  firstGlass(){
      this.note = 1;
      if(this.firstGlassClick===false){
      this.firstGlassClick=true;
      this.firstmousse = "80%";
      this.firstliquid = "91%";
    }else if(this.firstGlassClick===true && this.secondGlassClick===false && this.thirdGlassClick===false && this.fourthGlassClick===false && this.fifthGlassClick===false){
      this.note = null;
      this.firstGlassClick=false;
      this.firstmousse = "0px";
      this.firstliquid = "0px";
    }

    if(this.secondGlassClick===true){
      this.secondGlassClick=false;
      this.secondliquid = "0px";
      this.secondmousse = "0px";
    }

    if(this.thirdGlassClick===true){
      this.thirdGlassClick=false;
      this.thirdliquid = "0px";
      this.thirdmousse = "0px";
    }


    if(this.fourthGlassClick===true){
      this.fourthGlassClick=false;
      this.fourthliquid = "0px";
      this.fourthmousse = "0px";
    }

    if(this.fifthGlassClick===true){
      this.fifthGlassClick=false;
      this.fifthliquid = "0px";
      this.fifthmousse = "0px";
    }
  }

  secondGlass(){
      this.note = 2;
      if(this.secondGlassClick===false){
      this.firstGlassClick=true;  
      this.secondGlassClick=true;
      this.firstmousse = "80%";
      this.firstliquid = "91%";
      this.secondmousse = "80%";
      this.secondliquid = "91%";
    }else if(this.secondGlassClick===true && this.thirdGlassClick===false && this.fourthGlassClick===false && this.fifthGlassClick===false){
      this.note = null;
      this.secondGlassClick=false;
      this.firstGlassClick=false;
      this.firstmousse = "0px";
      this.firstliquid = "0px";
      this.secondmousse = "0px";
      this.secondliquid = "0px";
    }

    if(this.thirdGlassClick===true){
      this.thirdGlassClick=false;
      this.thirdliquid = "0px";
      this.thirdmousse = "0px";
    }


    if(this.fourthGlassClick===true){
      this.fourthGlassClick=false;
      this.fourthliquid = "0px";
      this.fourthmousse = "0px";
    }

    if(this.fifthGlassClick===true){
      this.fifthGlassClick=false;
      this.fifthliquid = "0px";
      this.fifthmousse = "0px";
    }
  }

  thirdGlass(){
      this.note = 3;
      if(this.thirdGlassClick===false){
      this.firstGlassClick=true;
      this.secondGlassClick=true;
      this.thirdGlassClick=true;
      this.firstmousse = "80%";
      this.firstliquid = "91%";
      this.secondmousse = "80%";
      this.secondliquid = "91%";
      this.thirdmousse = "80%";
      this.thirdliquid = "91%";
    }else if(this.thirdGlassClick===true && this.fourthGlassClick===false && this.fifthGlassClick===false){
      this.note = null;
      this.firstGlassClick=false;
      this.secondGlassClick=false;
      this.thirdGlassClick=false;
      this.firstmousse = "0px";
      this.firstliquid = "0px";
      this.secondmousse = "0px";
      this.secondliquid = "0px";
      this.thirdmousse = "0px";
      this.thirdliquid = "0px";
    }

    if(this.fourthGlassClick===true){
      this.fourthGlassClick=false;
      this.fourthliquid = "0px";
      this.fourthmousse = "0px";
    }

    if(this.fifthGlassClick===true){
      this.fifthGlassClick=false;
      this.fifthliquid = "0px";
      this.fifthmousse = "0px";
    }
  }

  fourthGlass(){
      this.note = 4;
      if(this.fourthGlassClick===false){
      this.firstGlassClick=true;
      this.secondGlassClick=true;
      this.thirdGlassClick=true;
      this.fourthGlassClick=true;
      this.firstmousse = "80%";
      this.firstliquid = "91%";
      this.secondmousse = "80%";
      this.secondliquid = "91%";
      this.thirdmousse = "80%";
      this.thirdliquid = "91%";
      this.fourthmousse = "80%";
      this.fourthliquid = "91%";
    }else if(this.fourthGlassClick===true && this.fifthGlassClick===false){
      this.note = null;
      this.firstGlassClick=false;
      this.secondGlassClick=false;
      this.thirdGlassClick=false;
      this.fourthGlassClick=false;
      this.firstmousse = "0px";
      this.firstliquid = "0px";
      this.secondmousse = "0px";
      this.secondliquid = "0px";
      this.thirdmousse = "0px";
      this.thirdliquid = "0px";
      this.fourthmousse = "0px";
      this.fourthliquid = "0px";
    }

    if(this.fifthGlassClick===true){
      this.fifthGlassClick=false;
      this.fifthliquid = "0px";
      this.fifthmousse = "0px";
    }
  }

  fifthGlass(){
    this.note = 5;
    if(this.fifthGlassClick===false){
      this.firstGlassClick=true;
      this.secondGlassClick=true;
      this.thirdGlassClick=true;
      this.fourthGlassClick=true;
      this.fifthGlassClick=true;
      this.firstmousse = "80%";
      this.firstliquid = "91%";
      this.secondmousse = "80%";
      this.secondliquid = "91%";
      this.thirdmousse = "80%";
      this.thirdliquid = "91%";
      this.fourthmousse = "80%";
      this.fourthliquid = "91%";
      this.fifthliquid = "84%";
      this.fifthmousse = "79%";
    }else{
      this.note = null;
      this.firstGlassClick=false;
      this.secondGlassClick=false;
      this.thirdGlassClick=false;
      this.fourthGlassClick=false;
      this.fifthGlassClick=false;
      this.firstmousse = "0px";
      this.firstliquid = "0px";
      this.secondmousse = "0px";
      this.secondliquid = "0px";
      this.thirdmousse = "0px";
      this.thirdliquid = "0px";
      this.fourthmousse = "0px";
      this.fourthliquid = "0px";
      this.fifthliquid = "0px";
      this.fifthmousse = "0px";
    }
  }

  close(){
    this.modalCtrl.dismiss();
  }

  rate(){

    if(this.note!=null){
      this.addRating(this.idENT, this.idUSER, this.note);
      this.modalCtrl.dismiss();
      this.sendNotification("Votre note à été bien prise en compte.");
    }else{
      this.sendNotification("Veuillez mettre une note avant de confirmer");
    }
  }

  addRating(idEnt, idUser, grade){
    const headers: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
          options: any		= { 'key' : 'addRating', 'idEnt' : idEnt, 'idUser' : idUser, 'grade' : grade},
          url: any      	= this.baseURI;
    
      this.http.post(url, JSON.stringify(options), headers).subscribe((data: any) => {
            console.log(data.message)
          },  
          (error: any) => {
              console.log(error);
          });
  }

  async sendNotification(msg: string) {
    const toast = await this.toastCtrl.create({
        message: msg,
        duration: 3000,
        position: 'top'
    });
    toast.present();
}

}
