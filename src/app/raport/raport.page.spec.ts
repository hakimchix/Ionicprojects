import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RaportPage } from './raport.page';

describe('RaportPage', () => {
  let component: RaportPage;
  let fixture: ComponentFixture<RaportPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RaportPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RaportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
