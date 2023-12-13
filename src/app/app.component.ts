import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { LoginComponent } from './Login/login.component';
import { PocetnaComponent } from './pocetna/pocetna.component';
import { ApiService } from '../servisi/api.services';
import { NgModule } from '@angular/core';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, LoginComponent, RouterLink, RouterLinkActive,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'projekt';
}





