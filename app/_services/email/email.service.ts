import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as sgMail from '@sendgrid/mail';
import { Observable } from 'rxjs';
const httpOptions = {
  headers: new HttpHeaders({
    Authorization: `Bearer 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`,
    "Access-Control-Allow-Origin": 'http://localhost:4200/'
  })
}
@Injectable({
  providedIn: 'root',
})
export class EmailService {
  constructor(private http:HttpClient) {
    // sgMail.setApiKey('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');
    sgMail.setApiKey('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'); //client

  }
//  sgMail.MailDataRequired | sgMail.MailDataRequired[]
  sendEmail(emailData:any):Observable<any> {
    return this.http.post('https://api.locallylist.com/sendGrid',emailData,httpOptions)  
    // return this.http.post('https://api.sendgrid.com/v3/mail/send',emailData,httpOptions)  
    // return sgMail.send(emailData);
  }
  
}