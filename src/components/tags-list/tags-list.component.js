import template from './tags-list.html';

const TagsListComponent = {
  template,
  controller: /* @ngInject */ class TagsListComponent {
    constructor($scope, TagsListService) {
      this.$scope = $scope;
      this.tagsListService = TagsListService;
    }

    $onInit() {
      this.tags = this.tagsListService.Tags().query();
    }
  }
};

export default TagsListComponent;
