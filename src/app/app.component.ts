import { Component } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
// @ts-ignore
import xml2js from 'xml2js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'front-edacy';

  public xmlItems: any;
  p: number = 1;
  constructor( private http: HttpClient ) {
    this.loadXML();
  }

  loadXML()
  {
    /*Read Data*/
    this.http.get('assets/lemonde.xml',
      {
        headers: new HttpHeaders()
          .set('Content-Type', 'text/xml')
          .append('Access-Control-Allow-Methods', 'GET')
          .append('Access-Control-Allow-Origin', '*')
          .append('Access-Control-Allow-Headers', "Access-Control-Allow-Headers, Access-Control-Allow-Origin, Access-Control-Request-Method"),
        responseType: 'text'
      })
      // @ts-ignore
      .subscribe((data) => {
        this.parseXML(data)
          // @ts-ignore
          .then((data) => {
            this.xmlItems = data;
            this.xmlItems = this.xmlItems['rss']['channel']['0'];
            // console.log(this.xmlItems.item)
          });
      });
    /*Read Data*/
  }
  //store xml data into array variable
  parseXML(data: any) {
    return new Promise(resolve => {
      let k: string | number,
        arr: unknown = [],
        parser = new xml2js.Parser(
          {
            trim: true,
            explicitArray: true
          }
        );
        parser.parseString(data, function (err: any, result:any) {
          resolve(result);
         });
      });
  }
}
