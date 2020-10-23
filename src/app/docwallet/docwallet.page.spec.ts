
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DocwalletPage } from './docwallet.page';

describe('DocwalletPage', () => {
  let component: DocwalletPage;
  let fixture: ComponentFixture<DocwalletPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocwalletPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DocwalletPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});