import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { KeycloakSampleTestModule } from '../../../test.module';
import { TfjUpdateComponent } from 'app/entities/tfj/tfj-update.component';
import { TfjService } from 'app/entities/tfj/tfj.service';
import { Tfj } from 'app/shared/model/tfj.model';

describe('Component Tests', () => {
  describe('Tfj Management Update Component', () => {
    let comp: TfjUpdateComponent;
    let fixture: ComponentFixture<TfjUpdateComponent>;
    let service: TfjService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [KeycloakSampleTestModule],
        declarations: [TfjUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(TfjUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TfjUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TfjService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Tfj(123);
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
        const entity = new Tfj();
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
