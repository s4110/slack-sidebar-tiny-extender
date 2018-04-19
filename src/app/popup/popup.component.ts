import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  resetWidth() {
      var dataset = {
          width : 500,
          reset: true
      };
      chrome.storage.local.set({SSTEWidth: dataset}, function() {});
  }
}
