import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import  { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  getUserList:any;
  constructor(private authService:AuthService,private router: Router,private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    let pageNo = this.activatedRoute.snapshot.queryParams.page ? this.activatedRoute.snapshot.queryParams.page : 1 ;
    this.getDetailsByPage(pageNo);
  }

 public getDetailsByPage(pageNo:number){
    this.changeQueryParamsOfUrl(pageNo);
    this.authService.getUserList(pageNo).toPromise().then((res:any)=>{
      this.getUserList = res;
      this.getUserList[`pages`]= new Array(this.getUserList.total_pages);
    });
  }

  public getNextPageDetails():void{
    const {page} = this.getUserList;
    this.getDetailsByPage(page+1);
  }

  public getPreviousPageDetails():void{
    const {page} = this.getUserList;
    this.getDetailsByPage(page-1);
  }

  public changeQueryParamsOfUrl(pageNo):void{
    this.router.navigate(
      [],
      {
        relativeTo: this.activatedRoute,
        queryParams: { page: pageNo },
        queryParamsHandling: 'merge'
      });
  }
}
