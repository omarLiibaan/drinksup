import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {EmailComposer} from '@ionic-native/email-composer/ngx';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.page.html',
    styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

    constructor(private route: Router, private emailComposer: EmailComposer) { }

    ngOnInit() {
    }
    async navTabs(msg: string) {
        this.route.navigateByUrl(msg);
    }
    goFaq(){
        console.log('salut');
        this.navTabs('/faq');
    }
    goAbonnement(){
        this.navTabs('/abonnement');
    }
    sendEmail(){

        const email = {
            to: 'admin@drinksup.ch',
            subject: 'Drinks up contact',
            body: '',
            isHtml: true
        };

// Send a text message using default options
        this.emailComposer.open(email);
    }

}
