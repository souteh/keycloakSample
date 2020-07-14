import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { KeycloakSampleTestModule } from '../../../test.module';
import { MessageerreurUpdateComponent } from 'app/entities/messageerreur/messageerreur-update.component';
import { MessageerreurService } from 'app/entities/messageerreur/messageerreur.service';
import { Messageerreur } from 'app/shared/model/messageerreur.model';

describe('Component Tests', () => {
  describe('Messageerreur Management Update Component', () => {
    let comp: MessageerreurUpdateComponent;
    let fixture: ComponentFixture<MessageerreurUpdateComponent>;
    let service: MessageerreurService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [KeycloakSampleTestModule],
        declarations: [MessageerreurUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(MessageerreurUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(MessageerreurUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(MessageerreurService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Messageerreur(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new Messageerreur();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
