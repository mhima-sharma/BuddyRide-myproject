import { Directive, ElementRef, EventEmitter, Output, AfterViewInit } from '@angular/core';

// ✅ This tells TypeScript to allow the global "google" object
declare const google: any;

@Directive({
  selector: '[appGooglePlaces]',
  standalone: true // ✅ Important in Angular 17+
})
export class GooglePlacesDirective implements AfterViewInit {
  @Output() placeChanged = new EventEmitter<string>();

  constructor(private el: ElementRef) {}

  ngAfterViewInit(): void {
    const autocomplete = new google.maps.places.Autocomplete(this.el.nativeElement, {
      types: ['(cities)'], // you can use 'geocode' for full address
      componentRestrictions: { country: 'in' }
    });

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      this.placeChanged.emit(place.formatted_address || place.name);
    });
  }
}


