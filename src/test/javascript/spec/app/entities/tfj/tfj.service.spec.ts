import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { TfjService } from 'app/entities/tfj/tfj.service';
import { ITfj, Tfj } from 'app/shared/model/tfj.model';

describe('Service Tests', () => {
  describe('Tfj Service', () => {
    let injector: TestBed;
    let service: TfjService;
    let httpMock: HttpTestingController;
    let elemDefault: ITfj;
    let expectedResult: ITfj | ITfj[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(TfjService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new Tfj(0, 0, currentDate, 'AAAAAAA');
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            datetfj: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a Tfj', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            datetfj: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            datetfj: currentDate,
          },
          returnedFromService
        );

        service.create(new Tfj()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Tfj', () => {
        const returnedFromService = Object.assign(
          {
            idtfj: 1,
            datetfj: currentDate.format(DATE_TIME_FORMAT),
            statuttfj: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            datetfj: currentDate,
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Tfj', () => {
        const returnedFromService = Object.assign(
          {
            idtfj: 1,
            datetfj: currentDate.format(DATE_TIME_FORMAT),
            statuttfj: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            datetfj: currentDate,
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Tfj', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
