/* global describe beforeEach it inject expect */
/* eslint no-undef: "off" */

describe('articleListService', () => {
  let $httpBackend;
  let service;
  let result;
  const successHandler = jasmine.createSpy('successHandler');
  const errorHandler = jasmine.createSpy('errorHandler');
  const ARTS = [
    { id: 1, title: 'title1' },
    { id: 2, title: 'title2' }
  ];

  beforeEach(angular.mock.module('articlesList'));
  beforeEach(inject((_$httpBackend_, ArticlesListService) => {
    $httpBackend = _$httpBackend_;
    service = ArticlesListService;
  }));

  afterEach(() => {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  describe('request fact expectations', () => {
    it('should send GET request', () => {
      $httpBackend.expectGET('/api/db/articles').respond();
      service.Articles().query();
      $httpBackend.flush();
    });

    it('should return promise', () => {
      $httpBackend.expectGET('/api/db/articles').respond();
      result = service.Articles().query();
      $httpBackend.flush();
      expect(result.$promise.then).toBeDefined();
      console.log('result', result);
      console.log('result.then', result.then);
      console.log('result.$promise', result.$promise);
      console.log('result.$promise.then', result.$promise.then);
    });
  });

  describe('response data expectations', () => {
    beforeEach(() => {
      $httpBackend.whenGET('/api/db/articles').respond(ARTS);
    });

    // it('should return array of article-objects', () => {
    //   $httpBackend.expectGET('/api/db/articles').respond(200, 'wtf does everything not fail test?');
    //   service.Articles().query();
    //   $httpBackend.flush();
    // });

    it('should return array of article-objects', () => {
      $httpBackend.expectGET('/api/db/articles').respond(200, ARTS);
      result = service.Articles().query();
      $httpBackend.flush();
      expect(result.$promise).toEqual(ARTS);
      console.log('result', result);
      console.log('result.then', result.then);
      console.log('result.$promise', result.$promise);
      console.log('result.$promise.then', result.$promise.then);
    });

    // it('should be called with article-objects', () => {
    //   $httpBackend.expectGET('/api/db/articles').respond(200, ARTS);
    //   service.Articles().query().$promise.then(successHandler);
    //   $httpBackend.flush();
    //   expect(successHandler).toHaveBeenCalledWith(ARTS);
    // });
  });
});
