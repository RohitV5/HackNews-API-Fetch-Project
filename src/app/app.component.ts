import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { element } from 'protractor';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  searchString: string;
  resultList: any[];
  pageSize = 10;
  page = 1;


  constructor(private http: HttpClient) {


  }

  getTitleAndAuthor() {
    if (!this.searchString)
      return;
    this.http.get("http://hn.algolia.com/api/v1/search", {
      params: {
        query: this.searchString
      },
    })
      .toPromise()
      .then(response => {
        console.log(response);
        this.resultList = response["hits"];
        this.resultList.forEach((element, index) => {
          this.getSubmissionCount(element["author"], index)
        })
      })
      .catch(console.log);
  }

  getSubmissionCount(author, index: number) {
    if (!author)
      return null;
    this.http.get("http://hn.algolia.com/api/v1/users/" + author)
      .toPromise()
      .then(response => {

        this.resultList[index].submissionCount = response["submission_count"];
        this.resultList = JSON.parse(JSON.stringify(this.resultList))
        console.log(this.resultList);
      })
      .catch(console.log);

  }



}
