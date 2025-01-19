import angular from 'angular'
import ngResource from 'angular-resource'

import './articles-list.less'
import ArticleModule from '../article/article.module'

import ArticlesListComponent from './articles-list.component'
import ArticlesListFilter from './articles-list.filter'
import ArticlesListService from './articles-list.service'

const ArticlesListModule = angular
  .module('articlesList', [ngResource, ArticleModule])
  .component('articlesList', ArticlesListComponent)
  .service('ArticlesListService', ArticlesListService)
  .filter('articlesListFilter', ArticlesListFilter).name

export default ArticlesListModule
