import angular from 'angular';

import AsideComponent from './aside.component';
import './aside.less';

const AsideModule = angular
  .module('aside', [])
  .component('aside', AsideComponent)
  .name;

export default AsideModule;
