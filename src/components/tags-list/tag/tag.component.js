import template from './tag.html';

const TagComponent = {
  bindings: {
    tag: '<'
  },
  template,
  controller: /* @ngInject */ class TagComponent {
    constructor($scope) {
      this.$scope = $scope;
    }

    onClickTag() {
      this.$scope.$emit('tagClickedUp', `#${this.tag.tagName}`);
    }
  }
};

export default TagComponent;
