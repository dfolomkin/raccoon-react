import template from './aside.html';

const AsideComponent = {
  template,
  controller: /* @ngInject */ class AsideComponent {
    constructor($scope) {
      this.$scope = $scope;
    }

    $postLink() {
      this.$scope.$emit('asideLinked');
    }
  }
};

export default AsideComponent;
