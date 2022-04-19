import { Component, OnInit } from '@angular/core';
import { FormGroup,FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { AbstractControlOptions, FormBuilder, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../_services/user.service';
import { AuthService } from '../_services/auth.service';
import { HttpClient } from '@angular/common/http';
import { Player } from '../models/Player';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-addplayer',
  templateUrl: './addplayer.component.html',
  styleUrls: ['./addplayer.component.css']
})
export class AddplayerComponent implements OnInit {
  playerForm!:FormGroup
  searchTerm!: string;
  countries!: Player[];
  term!: string;


  listData:Player[];

  form  = {
   shortName: '',
   fullName: '',
   playStoreLink : '',
   appStoreLink:'',
   linkDescription:'',
   color :''
  };


  // allplayers!: Observable<Player>;
    


  constructor(private fb : FormBuilder ,private authService: AuthService, private http:HttpClient ){
   
    this.listData=[{
      shortName: '',
      fullName: '',
      playStoreLink : '',
      appStoreLink:'',
      linkDescription:'',
      color :''
     }];

    //  const id=this.listData

    this.playerForm=this.fb.group({
    shortName:['',Validators.required],
    fullName:['',Validators.required],
    playStoreLink:['',Validators.required],
    appStoreLink:['',Validators.required],
    linkDescription:['',Validators.required],
    color:['',Validators.required]
    
    })
  }
   


  removeItem(element: any){
  this.listData.forEach((value: any,index: any)=>{
      if(value == element )
      this.listData.splice(index,1);
  })
}

  public addItem():void{
      this.listData.push(this.playerForm.value);
    
      console.log(this.listData);
      //  this.playerForm.reset();
  }



 
   reset(){this.playerForm.reset()}

// function RemoveElementFromArray(element: number) {
//     this.arrayElements.forEach((value,index)=>{
//         if(value==element) this.arrayElements.splice(index,1);
//     });
// }





  ngOnInit(): void {
    this.http.get<Player[]>('https://localhost:7098/Player/GetAll')
      .subscribe((data: Player[]) => {
        this.countries = data;
      });
  }
   
  
  
  onSubmit(): void {
    const { shortName,fullName,playStoreLink,appStoreLink,linkDescription,color } = this.form;
    console.log(this.form)
    this.authService.addPlayer( shortName,fullName,playStoreLink,appStoreLink,linkDescription,color).subscribe({
      next: data => {
        console.log(data.shortName);
        
     
        
      },
      error: err => {
     
      }
    });
  }




//  getplayers(){
//  this.allplayers=this.authService.getData();
//   }

  remove(){
    const shortname= this.form.shortName
    this.authService.deleteplayer().subscribe({
      next: data => {
        console.log(data);
      }   
  });
}
}

  


  