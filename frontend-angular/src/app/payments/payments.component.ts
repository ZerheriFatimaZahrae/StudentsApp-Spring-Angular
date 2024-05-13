import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {DataSource} from "@angular/cdk/collections";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {StudentsService} from "../services/students.service";
import {Payment} from "../model/students.model";

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrl: './payments.component.css'
})
export class PaymentsComponent implements OnInit {
  public payments:any;
  public dataSource:any;
  public displayedColumns=['id', 'date',
    'amount', 'type','status',
    'firstName',
  ]
  //chercher ds html un obj de type MatPaginator et affecter au var paginator
  @ViewChild(MatPaginator ) paginator!: MatPaginator

  @ViewChild(MatSort) matSort!:MatSort
  constructor(private http:HttpClient,
              private studentsService: StudentsService) {
  }

  ngOnInit(): void {
    this.studentsService.getAllPayments()
      .subscribe({
        next : data=>{
         this.payments=data
         this.dataSource=new MatTableDataSource(this.payments);
         this.dataSource.paginator=this.paginator
         this.dataSource.sort=this.matSort
        },
        error : err=>{
          console.log(err)

        }
      });
  }


}
