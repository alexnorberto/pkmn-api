import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const pkmnApiUrl="https://pokeapi.co/api/v2/"

@Injectable({
  providedIn: 'root'
})
export class PkmnApiService {

  constructor(
    private http:HttpClient,
  ) { }

  getEnds():Observable<any>{
    return this.http.get<any>(pkmnApiUrl);
  }

  getPkmnList(startPosition:number,pageLimit:number):Observable<any>{
    return this.http.get<any>(pkmnApiUrl+"pokemon?offset="+startPosition+"&limit="+pageLimit);
  }

  getPkmnById(id):Observable<any>{
    return this.http.get<any>(pkmnApiUrl+"pokemon/"+id);
  }

  getPkmnByUrl(url):Observable<any>{
    return this.http.get<any>(url);
  }
}
