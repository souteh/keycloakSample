import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { KeycloakSampleTestModule } from '../../../test.module';
import { ActionparamUpdateComponent } from 'app/entities/actionparam/actionparam-update.component';
import { ActionparamService } from 'app/entities/actionparam/actionparam.service';
import { Actionparam } from 'app/shared/model/actionparam.model';

describe('Component Tests', () => {
  describe('Actionparam Management Update Component', () => {
    let comp: ActionparamUpdateComponent;
    let fixture: ComponentFixture<ActionparamUpdateComponent>;
    let service: ActionparamService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [KeycloakSampleTestModule],
        declarations: [ActionparamUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(ActionparamUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ActionparamUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ActionparamService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Actionparam(123);
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
        const entity = new Actionparam();
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
