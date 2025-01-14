import angular from 'angular';
import ngResource from 'angular-resource';
import ngDialog from 'ng-dialog';

import ArticleComponent from './article.component';
import ArticleService from './article.service';
import './article.less';

const ArticleModule = angular
  .module('article', [
    ngResource,
    ngDialog
  ])
  .component('article', ArticleComponent)
  .service('ArticleService', ArticleService)
  .name;

export default ArticleModule;
