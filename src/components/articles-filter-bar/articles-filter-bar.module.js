import angular from 'angular';

import ArticlesFilterBarComponent from './articles-filter-bar.component';
import './articles-filter-bar.less';

const ArticlesFilterBarModule = angular
  .module('articlesFilterBar', [])
  .component('articlesFilterBar', ArticlesFilterBarComponent)
  .name;

export default ArticlesFilterBarModule;
