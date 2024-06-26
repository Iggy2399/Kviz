import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule,} from '@angular/common';
import { FormsModule, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../servisi/api.services';





@Component({
  selector: 'app-pocetna',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    RouterOutlet, 
    RouterLink, 
    RouterLinkActive, 
    ReactiveFormsModule,
  ],
  templateUrl: './pocetna.component.html',
  styleUrl: './pocetna.component.css',
})
export class AdminComponent {
  
  korisnik: any = this.fb.group({
    id: [null],
    ime: ['',[Validators.required, Validators.minLength(2)]],
    email: ['', Validators.compose([Validators.required, Validators.email])],
    
  })


  datoteka : any;
  tmpSlika: string = "download.png";
  uredjujem: number = 0;
  dodajem : number = 0;
  upload : number = 0;
  url : number = 0;
  image : boolean = false;
  korisnici : any;
  brojKorisnika: number = 0;
  podaci : any;

  constructor(
    public _router: Router,
    private fb : FormBuilder,
    private toastr: ToastrService,
    private api : ApiService,

  ){}

  Router(){
    this._router.navigate(['/api-call']);
  }
  ngOnInit(){
    this.dohvatiPodatke();  
    
  }
  dohvatiPodatke(){
    this.api.getData().subscribe(res =>{
       this.korisnici = res.data;
       this.brojKorisnika = this.korisnici.length
      console.log(this.korisnici.length)
    })

  }
  urediKorisnikaTablica(korisnik: any, index:any){
    console.log(korisnik);
    this.dodajem = 0;
    this.uredjujem = 1;
    for(let i = 0; i < this.korisnici.length; i++){
      if(this.korisnici[i].id == index){
        console.log(this.korisnici[i]);
        this.korisnici.patchValue({
          'id':  korisnik.id,
          'ime': korisnik.ime,
          'god_rodenja': korisnik.god_rodenja,
          'email': korisnik.email,
          'slika': korisnik.slika
        });
        
      }
    }
  }
  

  urediKorisnika(korisnik: any){
    
    this.uredjujem = 0;
    for(let i = 0; i < this.korisnici.length; i++){
      if(this.korisnici[i].id == korisnik.id){
        this.korisnici[i] = {
          'id': this.korisnici.id,
          'ime': this.korisnici.ime_prezime,
          'email': this.korisnici.email,
          
        }
        this.korisnik = {};
      }
    }
  }

  upravljanjeKorisnikom(korisnik: any){
    if(this.dodajem){
      if (this.upload == 1){
        this.korisnici.push({
          'id': this.korisnici.value.id,
          'ime': this.korisnici.value.ime,
          'email': this.korisnici.value.email,
          
        }
      );
          this.toastr.success("Korisnik uspješno dodan!")
      
      }
      else{
        this.korisnici.push({
          'id': this.korisnici.value.id,
          'ime': this.korisnici.value.ime,
          'email': this.korisnici.value.email,
          
        })
        this.toastr.success("Korisnik uspješno dodan!")
        
      }
      /*this.korisnici.push(this.korisnik.value); */
    } 
    if(this.uredjujem){
      for(let i = 0; i < this.korisnici.length; i++){
        if(this.korisnici[i].id == korisnik.value.id){
          this.korisnici[i] = {
            'id': korisnik.value.id,
            'ime': korisnik.value.ime,
            'god_rodenja': korisnik.value.god_rodenja,
            'email': korisnik.value.email,
            'slika': korisnik.value.slika
          }
        }
        this.toastr.success("Korisnik uspješno uređen!")
      }
    }
  }

  obrisiKorisnika(korisnik : any){
    for (let i = 0; i < this.korisnici.length; i++){
      if(this.korisnici[i].id == korisnik.id){

        this.korisnici.splice(i,1)
        this.toastr.success("Korisnik uspješno obrisan!")
      }
    }
  }

  UploadPriprema($event: any,){
    this.datoteka = $event.target.files;
    this.tmpSlika =  window.URL.createObjectURL($event.target.files[0]) 
  }

  prikaziFormu(){
    this.uredjujem = 0;
    this.dodajem = 1;
  }

  Upload(){
    this.upload = 1;
    this.url = 0;
  }
  UrlChoice(){
    this.upload = 0;
    this.url = 1;
  }
 

 
}