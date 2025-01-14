import angular from 'angular';

import SocialComponent from './social.component';

const SocialModule = angular
  .module('social', [])
  .component('social', SocialComponent)
  .name;

export default SocialModule;
