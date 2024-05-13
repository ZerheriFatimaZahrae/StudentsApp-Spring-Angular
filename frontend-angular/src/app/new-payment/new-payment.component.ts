import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";
import {PaymentType} from "../model/students.model";
import {StudentsService} from "../services/students.service";

@Component({
  selector: 'app-new-payment',
  templateUrl: './new-payment.component.html',
  styleUrl: './new-payment.component.css'
})
export class NewPaymentComponent implements OnInit {
  studentCode!:string;
  public newPaymentForm!:FormGroup;
  public paymentTypes : string[] = [];
  showProgress:boolean=false
  pdfFileUrl!:string;
  constructor(private route: ActivatedRoute,
              private fb:FormBuilder,
              private studentService:StudentsService)  {

  }
    ngOnInit(): void {
      for (let elt in PaymentType){
        let value = PaymentType[elt];
        if (typeof value === 'string'){
          this.paymentTypes.push(value);
        }
      }

      this.studentCode=this.route.snapshot.params['studentCode'];
      this.newPaymentForm=this.fb.group({
        date:this.fb.control(''),
        amount:this.fb.control('0.0'),
        type:this.fb.control(''),
        fileSource:this.fb.control(''),
        fileName:this.fb.control(''),
        studentCode:this.fb.control(this.studentCode),
      })
    }

  savePayment() {
    this.showProgress=true;

    let date= new Date(this.newPaymentForm.value.date);
    let formattedDate = date.getDate()+"/"+(date.getMonth()+1)+'/'+date.getFullYear();

    let formData = new FormData();
    formData.set('date', formattedDate);
    formData.set('amount', this.newPaymentForm.value.amount);
    formData.set('type', this. newPaymentForm.value.type);
    formData.set('studentCode', this.newPaymentForm.value.studentCode);
    formData.set('file', this.newPaymentForm.value.fileSource);
    this.studentService.savePayment(formData).subscribe({
      next: value => {
        this.showProgress=false
        alert('Payment Saved Successfully !')
      },
      error: err => {
        console.log(err);
      }
    });
  }


  selectFile(event: any) {
       if(event.target.files.length > 0) {
         let file = event.target.files[0]
         this.newPaymentForm.patchValue({
           fileSource: file,
           fileName: file.name
         })
         this.pdfFileUrl=window.URL.createObjectURL(file)
       }
  }
  afterLoadComplete($event: any) {
    console.log(event);
  }



}
