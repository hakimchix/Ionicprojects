import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LoginReqPage } from './login-req.page';

describe('LoginReqPage', () => {
  let component: LoginReqPage;
  let fixture: ComponentFixture<LoginReqPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginReqPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginReqPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
