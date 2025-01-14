import angular from 'angular';

import SocialModule from './social/social.module';

import SocialsListComponent from './socials-list.component';
import './socials-list.less';

const SocialsListModule = angular
  .module('socialsList', [
    SocialModule
  ])
  .component('socialsList', SocialsListComponent)
  .name;

export default SocialsListModule;
