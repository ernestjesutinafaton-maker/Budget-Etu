import { Component, input } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Depense } from '../depense';
import { BadgeCategorie } from '../badge-categorie/badge-categorie';

@Component({
  selector: 'app-depense-card',
  imports: [BadgeCategorie, DatePipe, CurrencyPipe, RouterLink],
  templateUrl: './depense-card.html',
  styleUrl: './depense-card.css',
})
export class DepenseCard {
  depense = input.required<Depense>();
}