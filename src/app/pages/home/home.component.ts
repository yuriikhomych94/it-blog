import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Article } from 'src/app/shared/models/article.model';
import { Topic } from 'src/app/shared/models/topic.model';
import { ArticleService } from 'src/app/shared/services/article.service';
import { TopicService } from 'src/app/shared/services/topic.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  modalRef: BsModalRef;
  

  form: FormGroup;
  articles: Array<Article> = [];
  topics: Array<Topic> = [];

  constructor(private articleService: ArticleService,
              private topicService: TopicService,
              private modalService: BsModalService) { }

  ngOnInit(): void {
    this.getTopics();
    this.form = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.minLength(2)]),
      image: new FormControl('', Validators.required),
      text: new FormControl('', [Validators.required, Validators.minLength(10)]),
      description: new FormControl('', [Validators.required, Validators.minLength(15)]),
      topic: new FormControl('', Validators.required),
    });
    this.getArticle();
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  getTopics(): void {
    this.topicService.getTopic().subscribe(
      data => {
      this.topics = data;
    })
  }


  getArticle(): void {
    this.articleService.getArticle().subscribe(data => {
      this.articles = data.reverse();
    })
  }

  addArticle(): void {
    const article: Article = this.form.value;
    if (this.topics.length > 0) {
      article.id = this.articles.length + 1;
    }
    this.articleService.addArticle(article).subscribe(() => {
      this.articles.unshift(article);
    });
  }


  
}
