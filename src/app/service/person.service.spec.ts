import { TestBed } from '@angular/core/testing';

import { PersonService } from './person.service';
import { Spy, createSpyFromClass } from 'jasmine-auto-spies';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Person } from '../dataaccess/person';

describe('PersonService', () => {
  let service:PersonService;
  let httpSpy: Spy<HttpClient>;

  const fakePersons:Person[] = [
    {
      id: 1,
      name: 'Person 1',
      sequence: undefined,
      task: 'Person 1 task',
      dateSetting: 'Person 1 date setting',
      remarks: 'Person 1 remarks'
    },
    {
      id: 2,
      name: 'Person 2',
      sequence: undefined,
      task: 'Person 2 task',
      dateSetting: 'Person 2  date setting',
      remarks: 'Person 2 remarks'
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: HttpClient, useValue: createSpyFromClass(HttpClient)}
      ]
    });
    service = TestBed.inject(PersonService);
    httpSpy = TestBed.inject<any>(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should return a list of persons', (done: DoneFn) => {
    httpSpy.get.and.nextWith(fakePersons);

    service.getList().subscribe({
        next:
         persons => {
            expect(persons).toHaveSize(fakePersons.length);
            done();
          },
        error: done.fail
      }
    );
    expect(httpSpy.get.calls.count()).toBe(1);
  });
  it('should create a new person', (done: DoneFn) => {

    const newPerson:Person = {
      id: 3,
      name: 'Person 3',
      sequence: undefined,
      task: '',
      dateSetting: '',
      remarks: ''
    };

    httpSpy.post.and.nextWith(newPerson);

    service.save(newPerson).subscribe({
        next:person => {
          expect(person).toEqual(newPerson);
          done();
        },
        error: done.fail
      }
    );
    expect(httpSpy.post.calls.count()).toBe(1);
  });

  it('should update an person', (done: DoneFn) => {

    const person = fakePersons[0];
    person.name = 'Updated Person';

    httpSpy.put.and.nextWith(person);

    service.update(person).subscribe({
      next:person => {
        expect(person.name).toEqual('Updated Person');
        done();
      },
      error: done.fail
    });
    expect(httpSpy.put.calls.count()).toBe(1);
  });

  it('should delete an existing person', (done: DoneFn) => {

    httpSpy.delete.and.nextWith(new HttpResponse({
      status: 200
    }));

    service.delete(1).subscribe({
      next: response => {
        expect(response.status).toBe(200);
        done();
      },
      error: done.fail
    });
    expect(httpSpy.delete.calls.count()).toBe(1);
  });
});

