import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthInterceptor } from '../_helpers/auth.interceptor';
import { IdentityUserDto } from '../models/register.model';
import { BaseBody } from '../models/delete.modals';
import { Player } from '../models/Player';
import { FormBuilder } from '@angular/forms';

const AUTH_API = 'https://localhost:7098/Auth/';

const Company_API='https://localhost:7098/'

const Company_Delete='https://localhost:7098/Company/'

let httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  

 
  constructor(public http: HttpClient, private fb : FormBuilder) { }

  login(UserName: string, Password: string, 
  ): Observable<any> {
    return this.http.post(AUTH_API + 'Login', {
       UserName,
       Password,
       
    }, httpOptions);
  }

  Register(userName: string, password: string,companyId:number): Observable<IdentityUserDto> {
    return this.http.post<IdentityUserDto> (AUTH_API + 'Register/', {
       userName,
       password,
       companyId,
      
    }, httpOptions);
  }
  CreateNewCompany(name:string, address:string ,numberOfEmployees:String):Observable<any>{
    return this.http.post(Company_API+ 'Company/CreateNewCompany',{
      name,
      address,
      numberOfEmployees
      

    },httpOptions);
  }
  

  
  // getData(): Observable<Player> {
  // return this.http.get<Player>('https://localhost:7098/Player/GetAll')

  // }

 DeleteCompany(id:number|undefined):Observable<BaseBody>{
  
    return this.http.post<BaseBody>(Company_Delete+ 'Delete',{

     id

    },httpOptions);
  }


  addPlayer(shortName:string,fullName:string,playStoreLink:string,appStoreLink:string,linkDescription:string,color:string):Observable<Player>{

    return this.http.post<Player>(Company_API+ 'Player/CreatePlayer',{

    
      shortName,fullName,playStoreLink,appStoreLink,linkDescription,color

    },httpOptions)
  }

  
deleteplayer():Observable<Player>{

  return this.http.post<Player>(Company_API+ 'Player/Delete',{

  },httpOptions)
}
 
}

 

 