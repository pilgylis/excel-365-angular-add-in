import { Component, NgZone, OnInit } from '@angular/core';

@Component({
  templateUrl: './dialog.component.html'
})
export class DialogComponent implements OnInit {
  text = '';

  ngOnInit() {
    this.text = localStorage.getItem('dialog');
  }
}
