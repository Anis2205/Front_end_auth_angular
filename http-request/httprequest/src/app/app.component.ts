
import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Post } from './post.model';
import { Postservice } from './post.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
  loadedPosts: Post[] = [];
  fetchpost = false
  error : null | string = null
  subscribed : Subscription |undefined 
  subscribed2 : Subscription |undefined


  constructor(private postservice: Postservice) { }

  ngOnInit() {
    this.fetchingpost()
    this.postservice.newpostcreated.subscribe(
      () => {
        this.fetchingpost()
      }
    )
    this.subscribed = this.postservice.error.subscribe(
      (data:string)=>{
        this.error=data
      }
    )


  }
  onFetchPosts() {
    this.fetchingpost()
  }

  onCreatePost(data: Post) {
    this.postservice.creatingpost(data);
  }

  onClearPosts() {
    this.postservice.clearposts().subscribe(
      () => {
        this.loadedPosts = []
      }

    )
  }
  onhandleerror(){
    this.error=null
  }
  private fetchingpost() {
    this.fetchpost = true
    this.subscribed2=this.postservice.fetchposts().subscribe(
      (data: Post[]) => {
        this.fetchpost = false
        this.loadedPosts = data
        console.log(this.loadedPosts)
      },error=>{
        console.log(error)
        this.fetchpost = false
        this.error=error.name
        
      }
    )
  }

  ngOnDestroy(): void {
    this.subscribed?.unsubscribe()
    this.subscribed2?.unsubscribe()
  }

}


