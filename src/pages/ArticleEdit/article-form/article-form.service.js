class ArticleFormService {
  constructor($resource) {
    this.$resource = $resource;
  }

  Article() {
    return this.$resource('/api/db/articles/:id', {}, {
      update: {
        method: 'PUT'
      }
    });
  }

  Articles() {
    return this.$resource('/api/db/articles');
  }

  Tags() {
    return this.$resource('/api/db/tags');
  }
}

/* @ngInject */
export default ArticleFormService;
