class ArticlesListService {
  constructor($resource) {
    this.$resource = $resource;
  }

  Articles() {
    return this.$resource('/api/db/articles');
  }
}

/* @ngInject */
export default ArticlesListService;
