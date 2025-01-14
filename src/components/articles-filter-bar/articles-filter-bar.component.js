import template from './articles-filter-bar.html';

const ArticlesFilterBarComponent = {
  template,
  controller: /* @ngInject */ class ArticlesFilterBarComponent {
    constructor($scope) {
      this.$scope = $scope;
    }

    $onInit() {
      this.$scope.$on('tagClickedDown', (event, data) => {
        this.filterQuery = data;
        this.onChangeInput();
      });
    }

    onChangeInput() {
      this.$scope.$emit('filterChangedUp', this.filterQuery);
    }
  }
};

export default ArticlesFilterBarComponent;
