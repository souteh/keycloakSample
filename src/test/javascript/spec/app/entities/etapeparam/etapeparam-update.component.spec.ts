import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { KeycloakSampleTestModule } from '../../../test.module';
import { EtapeparamUpdateComponent } from 'app/entities/etapeparam/etapeparam-update.component';
import { EtapeparamService } from 'app/entities/etapeparam/etapeparam.service';
import { Etapeparam } from 'app/shared/model/etapeparam.model';

describe('Component Tests', () => {
  describe('Etapeparam Management Update Component', () => {
    let comp: EtapeparamUpdateComponent;
    let fixture: ComponentFixture<EtapeparamUpdateComponent>;
    let service: EtapeparamService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [KeycloakSampleTestModule],
        declarations: [EtapeparamUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(EtapeparamUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(EtapeparamUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(EtapeparamService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Etapeparam(123);
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
        const entity = new Etapeparam();
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
