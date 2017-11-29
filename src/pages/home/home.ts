import { Component, AfterViewInit } from '@angular/core';
import { NavController } from 'ionic-angular';

import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  status:string = '-';

  constructor(public navCtrl: NavController, private payPal: PayPal) {

  }

  buy() {
    this.payPal.init({
      PayPalEnvironmentProduction: 'YOUR_PRODUCTION_CLIENT_ID',
      PayPalEnvironmentSandbox: 'YOUR_SANDBOX_CLIENT_ID'
    }).then(() => {
      this.status = "Configuring...";
      // Environments: PayPalEnvironmentNoNetwork, PayPalEnvironmentSandbox, PayPalEnvironmentProduction
      this.payPal.prepareToRender('PayPalEnvironmentSandbox', new PayPalConfiguration({
        // Only needed if you get an "Internal Service Error" after PayPal login!
        //payPalShippingAddressOption: 2 // PayPalShippingAddressOptionPayPal
      })).then(() => {
        this.status = "Preparing...";
        let payment = new PayPalPayment('3.33', 'BRL', 'Description', 'sale');
        this.payPal.renderSinglePaymentUI(payment).then(() => {
          this.status = "OK";
        }, () => {
          // Error or render dialog closed without being successful
        });
      }, () => {
        // Error in configuration
      });
    }, () => {
      // Error in initialization, maybe PayPal isn't supported or something else
    });
  }
}
