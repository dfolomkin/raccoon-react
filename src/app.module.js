import angular from 'angular';
import ngRoute from 'angular-route';

import ComponentsModule from './components/components.module';
import CommonModule from './common/common.module';

import AppComponent from './app.component';
import HeaderService from './header.service';
import DropdownsService from './dropdowns.service';
import './app.less';


const AppModule = angular
  .module('app', [
    ngRoute,
    ComponentsModule,
    CommonModule
  ])
  .component('app', AppComponent)
  .service('HeaderService', HeaderService)
  .service('DropdownsService', DropdownsService)
  .config(/* @ngInject */ ($routeProvider, $locationProvider) => {
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
    $routeProvider
      .when('/', {
        template: '<articles-list class="main js-main"></articles-list>'
      })
      .when('/article:id', {
        template: '<article-form class="main js-main"></article-form>'
      })
      .when('/newarticle', {
        template: '<article-form class="main js-main"></article-form>'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .name;
