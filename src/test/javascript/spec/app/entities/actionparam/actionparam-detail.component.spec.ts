import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { KeycloakSampleTestModule } from '../../../test.module';
import { ActionparamDetailComponent } from 'app/entities/actionparam/actionparam-detail.component';
import { Actionparam } from 'app/shared/model/actionparam.model';

describe('Component Tests', () => {
  describe('Actionparam Management Detail Component', () => {
    let comp: ActionparamDetailComponent;
    let fixture: ComponentFixture<ActionparamDetailComponent>;
    const route = ({ data: of({ actionparam: new Actionparam(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [KeycloakSampleTestModule],
        declarations: [ActionparamDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(ActionparamDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ActionparamDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load actionparam on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.actionparam).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
