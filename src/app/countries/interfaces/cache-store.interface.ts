import { Country } from "./country";
import { Region } from "./region.type";

export interface CacheStore {
    byCapital: TermCountries;
    byPais: TermCountries;
    byRegion: RegionCountries;
}

export interface TermCountries {
    termino: string;
    countries: Country[];
}

export interface RegionCountries {
    region:    Region;
    countries: Country[];
}