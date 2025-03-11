import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RickAndMortyService {
  private baseUrl = 'https:/rickandmortyapi.com/api'

  constructor(private http: HttpClient) { }

  getCharacters(page:number = 1): Observable<any>{
    return this.http.get(`${this.baseUrl}/character/?page=${page}`);
  }

  searchCharacter(name:string):Observable<any>{
    return this.http.get(`${this.baseUrl}/character/?name=${name}`);
  }

  getAllEpisodes(): Observable<any[]> {
    const episodes: any[] = [];
    const getEpisodes = (url:string): Observable<any> => {
      return this.http.get<any>(url).pipe(switchMap((data) => {
        episodes.push(...data.results);
        if (data.info.next) {
          return getEpisodes(data.info.next);
        } else {
          return of(episodes);
        }
      })
    );
    };
    return getEpisodes(`${this.baseUrl}/episode`)
  };

  getEpisode(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/episode`)
  }

  getEpisodeById(id:number):Observable<any> {
    return this.http.get(`${this.baseUrl}/episode/${id}`)
  }
}
