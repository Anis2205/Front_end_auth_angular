import { Post } from "./post.model";
import { HttpClient, HttpEventType, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators'
import { Injectable, OnDestroy } from "@angular/core";
import { Subject, Subscription, throwError } from "rxjs";
@Injectable(

)
export class Postservice implements OnDestroy {

    newpostcreated = new Subject()
    error = new Subject<string>()
    subscribed: Subscription | undefined
    constructor(private http: HttpClient) { }

    ngOnDestroy(): void {
        this.subscribed?.unsubscribe()
    }

    creatingpost(postData: Post) {
        // Send Http request 
        //angular automatically coverts javascript object to json 
        //.json at the end its requirement of firebase not angular
        this.subscribed = this.http.post<{ name: string }>
            ('https://angular-backend-2d381-default-rtdb.firebaseio.com/posts.json', postData,
                {
                    observe: 'response'
                }
            ).subscribe(
                (response) => {
                    //always emit event inside as it may take time to post data in database
                    this.newpostcreated.next()
                    console.log(response)
                },
                error => {
                    this.error.next(error.name)
                })



    }

    clearposts() {
        return this.http.delete('https://angular-backend-2d381-default-rtdb.firebaseio.com/posts.json',
        {
            observe:'events'
        }).pipe(tap
            (eventdata=>{
                if(eventdata.type === HttpEventType.Sent){
                    //dosomething
                }
                if(eventdata.type === HttpEventType.Response){
                    console.log(eventdata.body)
                }
                 
            }
            )
        )
    }


    fetchposts() {
        let searchparams = new HttpParams()
        searchparams = searchparams.append('print', 'pretty')
        searchparams = searchparams.append('print', 'hello')
        //we say that here will have random key for that we got Post value
        return this.http.get<{ [key: string]: Post }>
            ('https://angular-backend-2d381-default-rtdb.firebaseio.com/posts.json',
                {
                    headers: new HttpHeaders({ 'custom-header': 'hello' }),
                    // params: new HttpParams().set('print','pretty')
                    params: searchparams,
                    responseType:'json'

                }
            ).pipe(map(
                (posteddata) => {
                    const resultarray: Post[] = []
                    for (const key in posteddata) {
                        resultarray.push({ ...posteddata[key], id: key })
                    }
                    return resultarray
                },
                catchError(error => {
                    return throwError(error)
                }
                )

            ))

    }

}