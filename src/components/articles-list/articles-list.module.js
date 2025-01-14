import angular from 'angular';
import ngResource from 'angular-resource';

import ArticleModule from './article/article.module';

import ArticlesListComponent from './articles-list.component';
import ArticlesListService from './articles-list.service';
import ArticlesListFilter from './articles-list.filter';
import './articles-list.less';

const ArticlesListModule = angular
  .module('articlesList', [
    ngResource,
    ArticleModule
  ])
  .component('articlesList', ArticlesListComponent)
  .service('ArticlesListService', ArticlesListService)
  .filter('articlesListFilter', ArticlesListFilter)
  .name;

export default ArticlesListModule;
