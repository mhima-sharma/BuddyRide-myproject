import { Component } from '@angular/core';
import { HeaderComponent } from "../../header/header.component";
import { FooterComponent } from "../../footer/footer.component";
// import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-terms-and-condition',
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './terms-and-condition.component.html',
  styleUrl: './terms-and-condition.component.css'
})

export class TermsAndConditionComponent {

}
