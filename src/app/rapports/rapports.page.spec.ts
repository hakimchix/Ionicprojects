import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RapportsPage } from './rapports.page';

describe('RapportsPage', () => {
  let component: RapportsPage;
  let fixture: ComponentFixture<RapportsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RapportsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RapportsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});