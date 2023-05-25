import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { Country } from '../interfaces/country';

@Injectable({providedIn: 'root'})
export class CountriesService {

    private apiUrl: string = 'https://restcountries.com/v3.1';

    constructor(private http: HttpClient) { }

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

    public searchCapital(term: string):Observable<Country[]> {

        return this.http.get<Country[]>(`${ this.apiUrl }/capital/${ term }`)
        .pipe(
//            tap (countries => console.log('Paso por el tap1',countries)),
//            map( countries => []),
            catchError( error =>  {
                console.log(error);
                return of([]) 
            })
            );
    }

    public searchPais(term: string):Observable<Country[]> {

        return this.http.get<Country[]>(`${ this.apiUrl }/name/${ term }`)
        .pipe(
//            tap (countries => console.log('Paso por el tap1',countries)),
//            map( countries => []),
            catchError( error =>  {
                console.log(error);
                return of([]) 
            })
            );
    }
    public searchRegion(region: string):Observable<Country[]> {

        return this.http.get<Country[]>(`${ this.apiUrl }/region/${ region }`)
        .pipe(
//            tap (countries => console.log('Paso por el tap1',countries)),
//            map( countries => []),
            catchError( error =>  {
                console.log(error);
                return of([]) 
            })
            );
    }

}