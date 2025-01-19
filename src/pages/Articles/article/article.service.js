class ArticleService {
  constructor($resource) {
    this.$resource = $resource;
  }

  Article() {
    return this.$resource('/api/db/articles/:id');
  }
}

/* @ngInject */
export default ArticleService;
