import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {StudentsService} from "../services/students.service";
import {MatTableDataSource} from "@angular/material/table";
import {Payment} from "../model/students.model";
import {DataSource} from "@angular/cdk/collections";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {onErrorResumeNextWith} from "rxjs";

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrl: './student-details.component.css'
})
export class StudentDetailsComponent implements OnInit {
  studentCode!:string;
  studentPayments!:Array<Payment>;
  paymentDataSource!:MatTableDataSource<Payment>;
  public displayedColumns=['id', 'date',
    'amount', 'type','status',
    'firstName',
  ]
  //chercher ds html un obj de type MatPaginator et affecter au var paginator
  @ViewChild(MatPaginator ) paginator!: MatPaginator

  @ViewChild(MatSort) matSort!:MatSort
  constructor(private route:ActivatedRoute,
              private studentService:StudentsService,
              private router:Router){
  }
  ngOnInit(): void {
    //acceder au par code qd on deja specifier ds la route
    this.studentCode=this.route.snapshot.params['code'];

    this.studentService.getStudentPayment(this.studentCode)
      .subscribe({
        next : data=>{
          this.studentPayments=data
          this.paymentDataSource=new MatTableDataSource<Payment>(this.studentPayments)
          this.paymentDataSource.paginator=this.paginator
          this.paymentDataSource.sort=this.matSort
        },
        error : err=>{
          console.log(err)

        }
      });
  }


  protected readonly onErrorResumeNextWith = onErrorResumeNextWith;

  newPayment() {
    this.router.navigateByUrl(`/admin/newPayment/${this.studentCode}`)
  }
}
