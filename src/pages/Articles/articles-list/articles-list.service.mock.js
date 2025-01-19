/* eslint no-undef: "off" */

angular.module('articlesListServiceMock', [])
  .provider('ArticlesListService', function() {
    this.$get = function() {
      return {
        Articles: function() {
          return {
            query: jasmine.createSpy('Articles().query() spy').and.returnValue([
              { id: 1, title: 'title1' },
              { id: 2, title: 'title2' }
            ])
          }
        }
      }
    };
  });
