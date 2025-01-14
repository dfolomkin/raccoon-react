class TagsListService {
  constructor($resource) {
    this.$resource = $resource;
  }

  Tags() {
    return this.$resource('/api/db/tags');
  }
}

/* @ngInject */
export default TagsListService;
