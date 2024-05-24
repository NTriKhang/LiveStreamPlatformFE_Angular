import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, throwError } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { APIEndpoint } from '../constant/APIEndpoint';
import { HttpClient } from '@angular/common/http';
import { Room } from '../models/room';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(private httpClient: HttpClient) {

  }
  OnGetRoom(roomKey: string) : Observable<Room>{
    return this.httpClient.get<Room>(environment.backend_url + APIEndpoint.room.getRoom + roomKey, {observe: 'response'})
        .pipe(
          map(response => response.body),
          catchError(error => {
            console.error('Error fetching room data', error);
            return throwError(error);
          })
        )
  }
}
