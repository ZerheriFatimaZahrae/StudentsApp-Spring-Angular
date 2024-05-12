import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";
import {PaymentType} from "../model/students.model";

@Component({
  selector: 'app-new-payment',
  templateUrl: './new-payment.component.html',
  styleUrl: './new-payment.component.css'
})
export class NewPaymentComponent implements OnInit {
  studentCode!:string;
  public newPaymentForm!:FormGroup;
  public paymentTypes:PaymentType[]=[];
  constructor(private route: ActivatedRoute,
              private fb:FormBuilder,
              ) {

  }
    ngOnInit(): void {
    for (let elt in PaymentType){

      //this.paymentTypes.push(PaymentType[elt]);
    }
      this.studentCode=this.route.snapshot.params['code'];
      this.newPaymentForm=this.fb.group({
        date:this.fb.control(''),
        amount:this.fb.control('0.0'),
        type:this.fb.control(''),
        file:this.fb.control(''),
        studentCode:this.fb.control(this.studentCode),
      })
    }


  savePayment() {

  }
}
