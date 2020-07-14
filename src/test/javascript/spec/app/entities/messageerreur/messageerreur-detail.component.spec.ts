import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { KeycloakSampleTestModule } from '../../../test.module';
import { MessageerreurDetailComponent } from 'app/entities/messageerreur/messageerreur-detail.component';
import { Messageerreur } from 'app/shared/model/messageerreur.model';

describe('Component Tests', () => {
  describe('Messageerreur Management Detail Component', () => {
    let comp: MessageerreurDetailComponent;
    let fixture: ComponentFixture<MessageerreurDetailComponent>;
    const route = ({ data: of({ messageerreur: new Messageerreur(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [KeycloakSampleTestModule],
        declarations: [MessageerreurDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(MessageerreurDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(MessageerreurDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load messageerreur on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.messageerreur).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
