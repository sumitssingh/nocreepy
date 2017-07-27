import { Component, OnInit } from '@angular/core';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
// declare var Stripe:any;

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})

export class PaymentComponent implements OnInit {
  cardNumber: string;
  expiryMonth: string;
  expiryYear: string;
  cvc: string;
  model: any = {};
  Stripe: any;
  message: string;
  constructor() {
  //   const stripe = Stripe('pk_test_EBd7Qkiz2LP092Zch56dtkcn');
  //   const elements = stripe.elements();
  //   const card = elements.create('card', {
  //     style: {
  //       base: {
  //         iconColor: '#666EE8',
  //         color: '#31325F',
  //         lineHeight: '40px',
  //         fontWeight: 300,
  //         fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
  //         fontSize: '15px',
  //
  //         '::placeholder': {
  //           color: '#CFD7E0',
  //         },
  //       },
  //     }
  //   });
  //   card.mount('#card-element');
  }

  ngOnInit() {
  }
































  // getToken() {
  //   // this.message = 'Loading...';
  //   //
  //   // (<any>window).Stripe.card.createToken({
  //   //   number: this.cardNumber,
  //   //   exp_month: this.expiryMonth,
  //   //   exp_year: this.expiryYear,
  //   //   cvc: this.cvc
  //   // }, (status: number, response: any) => {
  //   //   if (status === 200) {
  //   //     this.message = `Success! Card token ${response.card.id}.`;
  //   //   } else {
  //   //     this.message = response.error.message;
  //   //   }
  //   // });
  //   var stripe = Stripe('pk_test_6pRNASCoBOKtIshFeQd4XMUh');
  //   var elements = stripe.elements();
  //
  //   var card = elements.create('card', {
  //     style: {
  //       base: {
  //         iconColor: '#666EE8',
  //         color: '#31325F',
  //         lineHeight: '40px',
  //         fontWeight: 300,
  //         fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
  //         fontSize: '15px',
  //
  //         '::placeholder': {
  //           color: '#CFD7E0',
  //         },
  //       },
  //     }
  //   });
  //   card.mount('#card-element');
  //
  //   function setOutcome(result) {
  //     var successElement = document.querySelector('.success');
  //     var errorElement = document.querySelector('.error');
  //     successElement.classList.remove('visible');
  //     errorElement.classList.remove('visible');
  //
  //     if (result.token) {
  //       // Use the token to create a charge or a customer
  //       // https://stripe.com/docs/charges
  //       successElement.querySelector('.token').textContent = result.token.id;
  //       successElement.classList.add('visible');
  //     } else if (result.error) {
  //       errorElement.textContent = result.error.message;
  //       errorElement.classList.add('visible');
  //     }
  //   }
  //
  //   card.on('change', function(event) {
  //     setOutcome(event);
  //   });
  //
  //   document.querySelector('form').addEventListener('submit', function(e) {
  //     e.preventDefault();
  //     var form = document.querySelector('form');
  //     // var extraDetails = {
  //     //   name: form.querySelector('input[name=cardholder-name]').value,
  //     // };
  //     // stripe.createToken(card, extraDetails).then(setOutcome);
  //   });
  // }
}
