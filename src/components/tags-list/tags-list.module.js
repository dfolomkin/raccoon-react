import angular from 'angular';
import ngResource from 'angular-resource';

import TagModule from './tag/tag.module';

import TagsListComponent from './tags-list.component';
import TagsListService from './tags-list.service';
import './tags-list.less';

const TagsListModule = angular
  .module('tagsList', [
    ngResource,
    TagModule
  ])
  .component('tagsList', TagsListComponent)
  .service('TagsListService', TagsListService)
  .name;

export default TagsListModule;
