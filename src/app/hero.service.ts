import { Injectable } from "@angular/core";
import { Hero } from "./hero";
import { HEROES } from "./mock-heroes";
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class HeroService {
    private heroUrl = 'api/heroes';
    private headers = new Headers({ 'Content-Type': 'application/json' });
    constructor(private http: Http) {

    }
    getHeroes(): Promise<Hero[]> {
        return this.http.get(this.heroUrl)
            .toPromise()
            .then(a => a.json().data as Hero[])
            .catch(this.handleError);

    }
    getHero(id: number): Promise<Hero> {
        const url = `${this.heroUrl}/${id}`;

        return this.http.get(url)
            .toPromise()
            .then(res => res.json().data as Hero)
            .catch(this.handleError);
        // return this.getHeroes().then(heroes => heroes.find(hero => hero.id === id));
    }
    update(hero: Hero): Promise<Hero> {

        const url = `${this.heroUrl}/${hero.id}`;

        return this.http.put(url, JSON.stringify(hero), { headers: this.headers })
            .toPromise()
            .then(() => hero)
            .catch(this.handleError);
    }
    create(name: string): Promise<Hero> {
        return this.http
            .post(this.heroUrl, JSON.stringify({ name: name }), { headers: this.headers })
            .toPromise()
            .then(res => res.json().data as Hero)
            .catch(this.handleError);
    }
    delete(id: number): Promise<void> {
        const url = `${this.heroUrl}/${id}`;
        return this.http.delete(url, { headers: this.headers })
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }
    private handleError(error: any): Promise<any> {
        console.log('An error occured', error);
        return Promise.reject(error.message || error);
    }
}