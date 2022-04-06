import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import { UserService } from "./user.service";


@Injectable({
  providedIn:'root'
})

export class Authservice implements CanActivate{
  constructor(private userservice:UserService,private route : Router){

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if(this.userservice.Accessstatus){
      return true;
    }
    else{
      this.route.navigate(['/'])
      return false;
    }
  }

}
