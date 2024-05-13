import { NgModule } from '@angular/core';
import {mapToCanActivate, RouterModule, Routes} from '@angular/router';
import {AdminTemplateComponent} from "./admin-template/admin-template.component";
import {LoadPaymentsComponent} from "./load-payments/load-payments.component";
import {HomeComponent} from "./home/home.component";
import {ProfileComponent} from "./profile/profile.component";
import {LoginComponent} from "./login/login.component";
import {LoadStudentsComponent} from "./load-students/load-students.component";
import {DashbordComponent} from "./dashbord/dashbord.component";
import {StudentsComponent} from "./students/students.component";
import {PaymentsComponent} from "./payments/payments.component";
import {AuthGuard} from "./guards/auth.guard";
import {AuthorizationGuard} from "./guards/authorization.guard";
import {StudentDetailsComponent} from "./student-details/student-details.component";
import {NewPaymentComponent} from "./new-payment/new-payment.component";
import {PaymentDetailComponent} from "./payment-detail/payment-detail.component";

const routes: Routes = [
  {path:"admin", component:AdminTemplateComponent,
    //proteger les routes par utilsation de service authGuard qui va verifier
    //si utilisateur est authentifie ou pas
    canActivate:[AuthGuard],
    children: [
      {path:"load-payments",component:LoadPaymentsComponent},
      {path:"profile",component:ProfileComponent},
      {
        path:"load-students",component:LoadStudentsComponent,
        //ajouter un autre guard pour load students , pour la proteger que pour
        // le cas d user est un admin ,
        canActivate:[AuthorizationGuard],data:{roles:['ADMIN']}
      },
      {
        path:"load-payments",component:LoadPaymentsComponent,
        canActivate:[AuthorizationGuard],data:{roles:['ADMIN']}
      },
      {path:"dashboard",component:DashbordComponent},
      {path:"students",component:StudentsComponent},
      {path:"payments",component:PaymentsComponent},
      {path:"home",component:HomeComponent},
      {path:"student-details/:code",component:StudentDetailsComponent},
      {path:"newPayment/:studentCode",component:NewPaymentComponent},
      {path:"paymentDetails/:id",component:PaymentDetailComponent},
    ]
  },



  {path:"login",component:LoginComponent},
  {path:"",component:LoginComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
