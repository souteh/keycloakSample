import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { KeycloakSampleTestModule } from '../../../test.module';
import { EtapeparamDetailComponent } from 'app/entities/etapeparam/etapeparam-detail.component';
import { Etapeparam } from 'app/shared/model/etapeparam.model';

describe('Component Tests', () => {
  describe('Etapeparam Management Detail Component', () => {
    let comp: EtapeparamDetailComponent;
    let fixture: ComponentFixture<EtapeparamDetailComponent>;
    const route = ({ data: of({ etapeparam: new Etapeparam(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [KeycloakSampleTestModule],
        declarations: [EtapeparamDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(EtapeparamDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(EtapeparamDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load etapeparam on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.etapeparam).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
