import { Component, Output, EventEmitter, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { trigger, transition, style, animate, state } from '@angular/animations';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <header class="fixed w-full top-0 z-20 transition-all duration-300" [ngClass]="{'bg-purple-900': !isScrolled, 'bg-purple-800 bg-opacity-80': isScrolled}">
      <div class="container mx-auto px-4 py-3">
        <div class="flex items-center justify-between">
          <div class="flex-shrink-0 w-1/4">
            <a routerLink="/" class="text-2xl font-bold text-white flex items-center">
              <img src="assets/logo/MockVest-logo-white.png" alt="MockVest Logo" class="h-14 w-auto mr-2" />
            </a>
          </div>
          <div class="flex-grow flex justify-center">
            <nav class="hidden lg:flex space-x-6">
              <a routerLink="/about" class="text-white hover:text-purple-200 transition-colors">Nosotros</a>
              <a routerLink="/glossary" class="text-white hover:text-purple-200 transition-colors">Glosario</a>
            </nav>
          </div>
          <div class="flex-shrink-0 w-1/4 flex justify-end items-center">
            <div class="hidden lg:flex space-x-4">
              <button (click)="onCreateAccountClick()" class="bg-purple-500 hover:bg-purple-400 text-white font-bold py-2 px-4 rounded transition-colors">
                Crear cuenta
              </button>
              <button (click)="onLoginClick()" class="bg-transparent border border-white hover:bg-white hover:text-purple-900 text-white font-bold py-2 px-4 rounded-lg transition-colors">
                Iniciar sesión
              </button>
            </div>
            <button (click)="toggleMenu()" class="lg:hidden text-white focus:outline-none z-30 ml-4">
              <svg *ngIf="!isMenuOpen" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg *ngIf="isMenuOpen" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>

    <div [@slideInOut]="isMenuOpen ? 'in' : 'out'" 
         class="fixed inset-0 bg-purple-900 z-20 lg:hidden"
         [ngClass]="{'pointer-events-none': !isMenuOpen}">
      <div class="container mx-auto px-4 py-3">
        <div class="flex justify-between items-center">
          <a routerLink="/" class="text-2xl font-bold text-white flex items-center">
            <img src="assets/logo/MockVest-logo-white.png" alt="MockVest Logo" class="h-14 w-auto mr-2" />
          </a>
          <button (click)="toggleMenu()" class="text-white focus:outline-none z-30">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
      <div class="flex flex-col items-center justify-start h-full pt-20">
        <nav class="flex flex-col space-y-4 items-center">
          <a routerLink="/about" (click)="toggleMenu()" class="text-white hover:text-purple-200 transition-colors text-xl">Nosotros</a>
          <a routerLink="/glossary" (click)="toggleMenu()" class="text-white hover:text-purple-200 transition-colors text-xl">Glosario</a>
        </nav>
        <div class="mt-8 flex flex-col space-y-4 w-64">
          <button (click)="onCreateAccountClick()" class="bg-purple-500 hover:bg-purple-400 text-white font-bold py-3 px-6 rounded transition-colors w-full">
            Crear cuenta
          </button>
          <button (click)="onLoginClick()" class="bg-transparent hover:bg-purple-800 text-purple-300 font-semibold hover:text-white py-3 px-6 border border-purple-300 hover:border-transparent rounded-lg transition-colors w-full">
            Iniciar sesión
          </button>
        </div>
        <div class="mt-16 text-center">
          <p class="text-white text-lg mb-4">Seguinos:</p>
          <div class="flex space-x-4">
            <a href="#" class="text-white hover:text-purple-200 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a href="#" class="text-white hover:text-purple-200 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
              </svg>
            </a>
            <a href="#" class="text-white hover:text-purple-200 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a href="#" class="text-white hover:text-purple-200 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
              </svg>
            </a>
            <a href="#" class="text-white hover:text-purple-200 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  `,
  animations: [
    trigger('slideInOut', [
      state('out', style({
        opacity: 0,
        transform: 'translateY(-100%)'
      })),
      state('in', style({
        opacity: 1,
        transform: 'translateY(0)'
      })),
      transition('out => in', [
        animate('300ms ease-out')
      ]),
      transition('in => out', [
        animate('300ms ease-in')
      ])
    ])
  ],
  styles: []
})
export class HeaderComponent {
  isMenuOpen = false;
  isScrolled = false;

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 10;
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  @Output() loginClick = new EventEmitter<void>();
  @Output() createAccountClick = new EventEmitter<void>();

  onLoginClick() {
    this.loginClick.emit();
  }

  onCreateAccountClick() {
    this.createAccountClick.emit();
  }
}