import { Component, OnInit } from '@angular/core';
import { Hero } from './hero';
import { HeroService } from './hero.service';
import { Router } from "@angular/router";

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import 'rxjs/add/observable/of';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { HeroSearchService } from './hero-search.service';

@Component({
    selector: 'hero-search',
    templateUrl: './hero-search.component.html',
    styleUrls: ['./hero-search.component.css'],
    providers: [HeroSearchService]
})
export class HeroSearchComponent implements OnInit {
    heroes: Observable<Hero []>;
    private searchTerms = new Subject<string>();

    constructor(private heroService: HeroService, private router: Router, private heroSearchService: HeroSearchService) {

    }
    search(term: string): void {
        // this.heroService.getHeroes().then(heroes => this.heroes = heroes);
        console.log('term search');
        this.searchTerms.next(term);
      //  this.heroSearchService.search(term).map(a => this.heroes = a);
    }
    gotoDetail(hero: Hero): void {
        let link = ['/detail', hero.id];
        this.router.navigate(link);
    }
    ngOnInit(): void {

            this.heroes = this.searchTerms
            .debounceTime(300)
            .distinctUntilChanged()
            .switchMap(term => term ? this.heroSearchService.search(term)
            : Observable.of<Hero[]>([]))
            .catch(error => {
                console.log(error);
                return Observable.of<Hero[]>([]);
            });
    }

}