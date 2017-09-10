import { Component, OnInit } from '@angular/core';
import { Hero } from './hero';
import { HeroService } from './hero.service';
import { Router } from "@angular/router";

@Component({
  selector: 'my-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  Heroes: Hero[];

  ngOnInit(): void {
    this.getHeroes();
  }



  selectedHero: Hero;
  constructor(private heroService: HeroService, private router: Router) {

  }

  onSelect(hero): void {
    this.selectedHero = hero;
  }
  getHeroes(): void {
    this.heroService.getHeroes().then(a => this.Heroes = a);
  }
  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedHero.id]);
  }
  add(name: string): void {
    name = name.trim();
    this.heroService.create(name).then(hero => {
      this.Heroes.push(hero);
      this.selectedHero = null;
    });
  }
  delete(hero: Hero): void {
    this.heroService.delete(hero.id)
      .then(() => {
        this.Heroes = this.Heroes.filter(h => h !== hero);
        if (this.selectedHero === hero) {
          this.selectedHero = null;
        }
      })
  }
}
