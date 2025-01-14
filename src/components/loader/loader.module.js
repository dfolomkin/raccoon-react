import angular from 'angular';

import LoaderComponent from './loader.component';
import './loader.less';

const LoaderModule = angular
  .module('loader', [])
  .component('loader', LoaderComponent)
  .name;

export default LoaderModule;
