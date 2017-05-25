import { TestBed, async } from '@angular/core/testing';

import { HelloWorldComponent } from './hello-world.component';

describe('HelloWorldComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HelloWorldComponent]
    });
    TestBed.compileComponents();
  }));

  it('should display title', () => {
    const fixture = TestBed.createComponent(HelloWorldComponent);
    const header = fixture.nativeElement.querySelector('h1');

    expect(header.textContent).toEqual('Hello World!');
  });
});
