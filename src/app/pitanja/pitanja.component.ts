import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../../servisi/api.services';
import { CommonModule} from '@angular/common';

@Component({
  selector: 'app-pitanja',
  standalone: true,
  imports: [RouterLink, CommonModule, RouterOutlet,
    RouterLinkActive],
  templateUrl: './pitanja.component.html',
  styleUrl: './pitanja.component.css'
})
export class PitanjaComponent {

  prikaziOdgovor : boolean = false;
  trenutnoPitanje: number = 0;
  ucitano : Boolean = false;
  pitanja: any = [] ;
  tocan_odgovor: any =[];
  incorrectKey: boolean = false;
  correctKey: boolean = false;
  counter: number = 0;
  answer: boolean = false;
  
  
  constructor(private http: HttpClient, private api: ApiService){}

ngOnInit(): void{
  this.dohvatiPitanja();
  
}

  dohvatiPitanja(){
    this.api.dohvatiPitanja().subscribe(res =>{
    this.pitanja = res.data;
    const newList = this.pitanja.sort(()=> Math.random()- 0.5);
    console.log(newList);
    return newList;
      
    }) 
  }

  iducePitanje(){
    this.answer = false;
    this.correctKey = false;
    this.incorrectKey = false;
    if(this.trenutnoPitanje < this.pitanja.length - 1){
     this.trenutnoPitanje ++;
    }
  }

  pocniKviz(){
    this.ucitano = true;
  }
  zero(){
    return 0;
  }
  
  selectOption(option:any) {
    this.answer = true;
    if(option == "tocan_odgovor"){
    this.correctKey = true;
    this.counter ++;
    console.log(this.correctKey, option);
    }else{
      this.incorrectKey = true;
      this.correctKey = true;
      console.log(this.incorrectKey, option);
    }
  }
  
  
}
