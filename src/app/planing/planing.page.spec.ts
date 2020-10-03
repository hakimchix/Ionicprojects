import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PlaningPage } from './planing.page';

describe('PlaningPage', () => {
  let component: PlaningPage;
  let fixture: ComponentFixture<PlaningPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaningPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PlaningPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
