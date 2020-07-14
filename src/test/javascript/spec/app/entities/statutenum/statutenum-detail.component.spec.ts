import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { KeycloakSampleTestModule } from '../../../test.module';
import { StatutenumDetailComponent } from 'app/entities/statutenum/statutenum-detail.component';
import { Statutenum } from 'app/shared/model/statutenum.model';

describe('Component Tests', () => {
  describe('Statutenum Management Detail Component', () => {
    let comp: StatutenumDetailComponent;
    let fixture: ComponentFixture<StatutenumDetailComponent>;
    const route = ({ data: of({ statutenum: new Statutenum(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [KeycloakSampleTestModule],
        declarations: [StatutenumDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(StatutenumDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(StatutenumDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load statutenum on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.statutenum).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
