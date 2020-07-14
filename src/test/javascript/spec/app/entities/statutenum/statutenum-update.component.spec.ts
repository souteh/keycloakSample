import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { KeycloakSampleTestModule } from '../../../test.module';
import { StatutenumUpdateComponent } from 'app/entities/statutenum/statutenum-update.component';
import { StatutenumService } from 'app/entities/statutenum/statutenum.service';
import { Statutenum } from 'app/shared/model/statutenum.model';

describe('Component Tests', () => {
  describe('Statutenum Management Update Component', () => {
    let comp: StatutenumUpdateComponent;
    let fixture: ComponentFixture<StatutenumUpdateComponent>;
    let service: StatutenumService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [KeycloakSampleTestModule],
        declarations: [StatutenumUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(StatutenumUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(StatutenumUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(StatutenumService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Statutenum(123);
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
        const entity = new Statutenum();
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
