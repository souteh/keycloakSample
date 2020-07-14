import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { KeycloakSampleTestModule } from '../../../test.module';
import { EtapeDetailComponent } from 'app/entities/etape/etape-detail.component';
import { Etape } from 'app/shared/model/etape.model';

describe('Component Tests', () => {
  describe('Etape Management Detail Component', () => {
    let comp: EtapeDetailComponent;
    let fixture: ComponentFixture<EtapeDetailComponent>;
    const route = ({ data: of({ etape: new Etape(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [KeycloakSampleTestModule],
        declarations: [EtapeDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(EtapeDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(EtapeDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load etape on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.etape).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
