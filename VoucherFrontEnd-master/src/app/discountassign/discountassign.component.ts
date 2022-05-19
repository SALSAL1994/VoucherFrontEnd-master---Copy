import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { companyBodyDto, GetAllCompaniesResponseDto } from '../models/GetAllCompaniesResponseDto';
import { GetAllPlayerResponseDto, PlayerBodyDto } from '../models/GetAllPlayerResponseDto';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-discountassign',
  templateUrl: './discountassign.component.html',
  styleUrls: ['./discountassign.component.css']
})
export class DiscountassignComponent implements OnInit {


  listcompany!:companyBodyDto[];

  discountform! :FormGroup;


  listData!:PlayerBodyDto[];

  constructor(private fb : FormBuilder ,private authService: AuthService, private http:HttpClient, private router:Router) {




    this.discountform=this.fb.group({

     companyId:['',Validators.required],
     playerId:['',Validators.required],
     discountId:['',Validators.required],
     number:['',Validators.required]


    });
   }

  ngOnInit(): void {


    this.getcompany();
    this.getPlayer();
   
  }






  getcompany (){
    this.http.get<GetAllCompaniesResponseDto>('https://localhost:7098/Company/GetAll').pipe(
      map(res => res.companies)
    ).subscribe(res => {
      this.listcompany = res;
    })
    
  }


  getPlayer(){
   


    this.http.get<GetAllPlayerResponseDto>('https://localhost:7098/Player/GetAll').pipe(
      map(res => res.players)
     
    ).subscribe(res => {
      this.listData = res;
    });
  }
  
}
