import { Component, OnInit } from '@angular/core';
import {NavController, ToastController} from '@ionic/angular';
import {Stripe} from '@ionic-native/stripe/ngx';
@Component({
    selector: 'app-abonnement',
    templateUrl: './abonnement.page.html',
    styleUrls: ['./abonnement.page.scss'],
})
export class AbonnementPage implements OnInit {

    cardNumber: string;
    cardMonth: number;
    cardYear: number;
    cardCVV: string;

    constructor(public navCtrl: NavController, public stripe: Stripe, private toastCtrl: ToastController) {
    }
    ngOnInit() {
    }



    validateCard(){
        const card = {
            number: this.cardNumber,
            expMonth: this.cardMonth,
            expYear: this.cardYear,
            cvc: this.cardCVV,
            'amount': '1',
            'currency': 'chf'
        };

        // Run card validation here and then attempt to tokenise
        this.stripe.setPublishableKey('pk_test_CUYWhZ0YY8PeL92xNKstWy7i00kHqejvae');
        this.stripe.createCardToken(card)
            .then(token => {
                console.log(token);
                this.sendNotification('transaction Successfull');
            })
            .catch(error => {
                console.error(error);
                this.sendNotification('transaction Failed');
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
