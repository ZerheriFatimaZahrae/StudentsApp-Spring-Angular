import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateFn,
  GuardResult,
  MaybeAsync, Router,
  RouterStateSnapshot
} from '@angular/router';
import {Injectable} from "@angular/core";
import {AuthService} from "../services/auth.service";


//creer des guards pour proteger les routes

@Injectable()
export class AuthGuard {

  constructor(private authService: AuthService,
              private router:Router) {
  }
  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    //qd on va appeler une route , les guards vont verifier si utilisateur
    // authenticated , si authentifie va return true else return false
    if (this.authService.isAuthenticated){
      return true;
    }
    else {
      this.router.navigateByUrl('/login');
      return false ;
    }

  }

}
