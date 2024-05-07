import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { faCalendar, faUser } from "@fortawesome/free-solid-svg-icons";
import { Observable } from "rxjs";
import { switchMap } from "rxjs/operators";
import { BlogService } from "src/app/services/blog.service";
import { UserService } from "src/app/services/user.service";
import { Post } from "../../models/post";

@Component({
  selector: "app-blog",
  templateUrl: "./blog.component.html",
  styleUrls: ["./blog.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogComponent implements OnInit {
  postId: string;
  blog$: Observable<Post>;

  faCalendar = faCalendar;
  faUser = faUser;

  isLoggedIn = false;
  title = "";
  content = "";
  message = "";

  // blog$ = this.activatedRoute.paramMap.pipe(
  //   switchMap((params) => {
  //     this.postId = params.get("id");
  //     if (this.postId) {
  //       return this.blogService.getPostbyId(this.postId);
  //     } else {
  //       return EMPTY;
  //     }
  //   })
  // );

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly blogService: BlogService,
    private userService:UserService
  ) {}

  ngOnInit() {
    this.isLoggedIn = !!this.userService.getToken();
    this.fetchBlogs();
   
  }

  fetchBlogs(){
     this.blog$ = this.activatedRoute.paramMap.pipe(
       switchMap((params) => {
         this.postId = params.get("id");
         return this.blogService.getPostById(this.postId);
       })
     );
  }
}