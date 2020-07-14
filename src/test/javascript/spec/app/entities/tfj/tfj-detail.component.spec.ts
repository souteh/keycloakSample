import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { KeycloakSampleTestModule } from '../../../test.module';
import { TfjDetailComponent } from 'app/entities/tfj/tfj-detail.component';
import { Tfj } from 'app/shared/model/tfj.model';

describe('Component Tests', () => {
  describe('Tfj Management Detail Component', () => {
    let comp: TfjDetailComponent;
    let fixture: ComponentFixture<TfjDetailComponent>;
    const route = ({ data: of({ tfj: new Tfj(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [KeycloakSampleTestModule],
        declarations: [TfjDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(TfjDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TfjDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load tfj on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.tfj).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
