import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: [ './header.component.css' ]
})
export class HeaderComponent implements OnInit {
  collapsed = true;
  // @Output() onSectionClick = new EventEmitter<string>();

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onClick(section: string) {
    console.log(section);
    //this.onSectionClick.emit(section);
    this.router.navigate([ '/', section ]);
  }

}
