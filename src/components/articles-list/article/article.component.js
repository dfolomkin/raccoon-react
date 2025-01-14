/* eslint import/no-extraneous-dependencies: "off" */
/* eslint import/no-unresolved: "off" */

import tmplDialog from 'Components/dialog/dialog.html';
import 'Components/dialog/dialog.less';
import template from './article.html';

const ArticleComponent = {
  bindings: {
    article: '<',
    onDelete: '&'
  },
  template,
  controller: /* @ngInject */ class ArticleComponent {
    constructor($location, ngDialog, ArticleService) {
      this.$location = $location;
      this.ngDialog = ngDialog;
      this.articleService = ArticleService;
    }

    onClickEdit() {
      this.$location.path(`/article${this.article.id}`);
    }

    onClickDelete() {
      this.ngDialog.openConfirm({
        template: tmplDialog,
        plain: true
      }).then(() => {
        this.articleService.Article().delete({ id: this.article.id });
        this.onDelete();
      });
    }
  }
};

export default ArticleComponent;
