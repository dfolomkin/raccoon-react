import angular from 'angular';
import ngResource from 'angular-resource';
import ngRoute from 'angular-route';
import ngFileUpload from 'ng-file-upload';

import ArticleFormComponent from './article-form.component';
import ArticleFormService from './article-form.service';
import './article-form.less';

const ArticleFormModule = angular
  .module('articleForm', [
    ngResource,
    ngRoute,
    ngFileUpload
  ])
  .component('articleForm', ArticleFormComponent)
  .service('ArticleFormService', ArticleFormService)
  .name;

export default ArticleFormModule;
