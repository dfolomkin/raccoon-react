/* global describe beforeEach it inject expect */
/* eslint no-undef: "off" */

describe('articlesListController', () => {
  let ctrl;
  let service;
  const ARTS = [
    { id: 1, title: 'title1' },
    { id: 2, title: 'title2' }
  ];

  beforeEach(angular.mock.module('articlesList'));
  beforeEach(angular.mock.module('articlesListServiceMock'));

  beforeEach(inject(($componentController, ArticlesListService) => {
    ctrl = $componentController('articlesList', null);
    service = ArticlesListService;
  }));

  describe('props by constructor', () => {
    it('should be defined', () => {
      expect(ctrl.$scope).toBeDefined();
      expect(ctrl.$location).toBeDefined();
      expect(ctrl.articlesListService).toBeDefined();
    });
  });

  describe('props by $onInit()', () => {
    beforeEach(() => {
      ctrl.$onInit();
    });

    it('should be defined', () => {
      expect(ctrl.filterQuery).toBeDefined();
      expect(ctrl.articles).toBeDefined();
    });

    it('should have initial values', () => {
      expect(ctrl.filterQuery).toBe('');
      expect(ctrl.articles).toEqual(ARTS);
    });
  });

  describe('method deleteArticle()', () => {
    beforeEach(() => {
      spyOn(ctrl, '$onInit');
      ctrl.deleteArticle();
    });

    it('should call $onInit()', () => {
      expect(ctrl.$onInit).toHaveBeenCalled();
    });
  });

  describe('method onClickAdd()', () => {
    beforeEach(() => {
      spyOn(ctrl.$location, 'path');
      ctrl.onClickAdd();
    });

    it('should call $location.path()', () => {
      expect(ctrl.$location.path).toHaveBeenCalled();
    });

    it('should call $location.path() with right arguments', () => {
      expect(ctrl.$location.path).toHaveBeenCalledWith('/newarticle');
    });
  });
});
