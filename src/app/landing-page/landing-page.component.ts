import { Component } from '@angular/core';
import { ApiService } from '../../servisi/api.services';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent {
  pitanja : any;


  constructor(private api : ApiService){}

  fetchRandomQuestion(category : number){
    this.api.fetchQuestion(category).subscribe(res => {
      this.pitanja = res.results;
      console.log(this.pitanja)});
    }
    }
      
    

  

