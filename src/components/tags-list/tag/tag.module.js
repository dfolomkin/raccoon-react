import angular from 'angular';

import TagComponent from './tag.component';

const TagModule = angular
  .module('tag', [])
  .component('tag', TagComponent)
  .name;

export default TagModule;
