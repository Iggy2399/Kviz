import { Component } from '@angular/core';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../servisi/api.services';
import { AuthService } from '../../servisi/auth.service';

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
    ime: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', Validators.compose([Validators.required, Validators.email])],
  });

  korisnici: any;
  brojKorisnika: number = 0;
  podaci: any;
  dataRefresher: any;
  korisnikPodaci: any;

  constructor(
    public _router: Router,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private api: ApiService,
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.dohvatiPodatke();
    //this.dohvatiPodatkeKorisnika();
    //this.refreshData();
  }
  refreshData() {
    this.dataRefresher = setInterval(() => {
      this.dohvatiPodatke();
      2000;
    });
  }
  dohvatiPodatke() {
    this.api.getData().subscribe((res) => {
      this.korisnici = res.data;
      this.brojKorisnika = this.korisnici.length;
    });
  }
  urediKorisnikaTablica(korisnik: any, index: any) {
    console.log(korisnik);

    for (let i = 0; i < this.korisnici.length; i++) {
      if (this.korisnici[i].id == index) {
        console.log(this.korisnici[i]);
        this.korisnici.patchValue({
          id: korisnik.id,
          ime: korisnik.ime,
          god_rodenja: korisnik.god_rodenja,
          email: korisnik.email,
          slika: korisnik.slika,
        });
      }
    }
  }
  dohvatiPodatkeKorisnika() {
    this.korisnikPodaci = this.auth.getUserInfo();
    console.log(this.korisnikPodaci);
  }

  obrisiKorisnika(id: number): void {
    console.log(id);

    if (confirm(`Želite li obrisati korisnika?`)) {
      this.api.deleteKorisnik(id).subscribe(
        (res) => {
          console.log('User deleted:', res);
        },
        (err) => {
          console.error('Failed to delete user:', err);
        }
      );
    }
  }
  logout() {
    this.auth.logout();
  }
}
