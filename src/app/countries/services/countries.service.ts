import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, delay, map, of, tap } from 'rxjs';
import { Country } from '../interfaces/country';
import { CacheStore } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/region.type';

@Injectable({providedIn: 'root'})
export class CountriesService {

    private apiUrl: string = 'https://restcountries.com/v3.1';

    public cacheStore: CacheStore = {
        byCapital:  { termino: '', countries: [] },
        byPais:     { termino: '', countries: [] },
        byRegion:   { region: '', countries: [] },
    };

    constructor(private http: HttpClient) { 
        this.loadLocalStorage();
    }

    private saveLocalStorage() {
        localStorage.setItem('cacheStore', JSON.stringify(this.cacheStore));
    }

    private loadLocalStorage() {
        if (!localStorage.getItem('cacheStore')) return;

        this.cacheStore = JSON.parse(localStorage.getItem('cacheStore')!);
    }

    private getCountriesRequest( url: string ):Observable<Country[]> {

        return this.http.get<Country[]>( url )
            .pipe(
//            tap (countries => console.log('Paso por el tap1',countries)),
//            map( countries => []),
                catchError( () => of([]) ),
                
                // Forzar una espera de 1/2 sg
                delay (500),
            );
    }

    public searchPaisByAlfa(code: string):Observable<Country | null> {

        return this.http.get<Country[]>(`${ this.apiUrl }/alpha/${ code }`)
        .pipe(
            map( countries => countries.length > 0 ? countries[0] : null),
            catchError( error =>  {
                console.log(error);
                return of(null)
            })
            );
    }

    public searchByCapital(term: string):Observable<Country[]> {

        const url =`${ this.apiUrl }/capital/${ term }`;
        return this.getCountriesRequest(url)
            .pipe(
                tap( countries => this.cacheStore.byCapital = { termino: term, countries: countries } ),
                tap( () => this.saveLocalStorage() ),
            );
    }

    public searchByPais(term: string):Observable<Country[]> {
        const url =`${ this.apiUrl }/name/${ term }`;
        return this.getCountriesRequest(url)
            .pipe(
                tap( countries => this.cacheStore.byPais = { termino: term, countries } ),
                tap( () => this.saveLocalStorage() ),
            );
    }

    public searchByRegion(region: Region):Observable<Country[]> {
        const url =`${ this.apiUrl }/region/${ region }`;
        return this.getCountriesRequest(url)
            .pipe(
                tap( countries => this.cacheStore.byRegion = { region, countries } ),
                tap( () => this.saveLocalStorage() ),
            );
    }

}