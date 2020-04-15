import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  year = new Date().getFullYear();
  loadAPI: Promise<any>;

  constructor( private api: AppService) {
  }

  ngOnInit() {
    this.loadAPI = new Promise((resolve) => {
      this.loadSendEmailScript();
      resolve(true);
    });
  }

  loadSendEmailScript() {
    let isFound = false;
    const scripts = document.getElementsByTagName('script');
    for (let i = 0; i < scripts.length; ++i) {
      if (scripts[i].getAttribute('src') != null && scripts[i].getAttribute('src').includes('loader')) {
        isFound = true;
      }
    }

    if (!isFound) {
      const smtpScript = 'assets/js/smtp.js';
      const node = document.createElement('script');
      node.src = smtpScript;
      node.type = 'text/javascript';
      node.async = false;
      node.charset = 'utf-8';
      document.getElementsByTagName('head')[0].appendChild(node);
    }
  }
}
