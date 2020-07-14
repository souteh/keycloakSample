import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { KeycloakSampleTestModule } from '../../../test.module';
import { EtapeUpdateComponent } from 'app/entities/etape/etape-update.component';
import { EtapeService } from 'app/entities/etape/etape.service';
import { Etape } from 'app/shared/model/etape.model';

describe('Component Tests', () => {
  describe('Etape Management Update Component', () => {
    let comp: EtapeUpdateComponent;
    let fixture: ComponentFixture<EtapeUpdateComponent>;
    let service: EtapeService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [KeycloakSampleTestModule],
        declarations: [EtapeUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(EtapeUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(EtapeUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(EtapeService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Etape(123);
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
        const entity = new Etape();
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
