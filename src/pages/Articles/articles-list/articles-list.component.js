import template from './articles-list.html';

const ArticlesListComponent = {
  template,
  controller: /* @ngInject */ class ArticlesListComponent {
    constructor($scope, $location, ArticlesListService) {
      this.$scope = $scope;
      this.$location = $location;
      this.articlesListService = ArticlesListService;
    }

    $onInit() {
      this.articles = this.articlesListService.Articles().query();
      this.filterQuery = '';
      this.$scope.$on('filterChangedDown', (event, data) => {
        this.filterQuery = data;
      });
    }

    onClickAdd() {
      this.$location.path('/newarticle');
    }

    deleteArticle() {
      this.$onInit();
    }
  }
};

export default ArticlesListComponent;
