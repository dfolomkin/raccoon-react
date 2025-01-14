/* eslint class-methods-use-this: "off" */

class HeaderService {
  activate() {
    const aboutDropdown = document.getElementsByClassName('js-about-dropdown')[0];
    const infoDropdown = document.getElementsByClassName('js-info-dropdown')[0];
    const tagsDropdown = document.getElementsByClassName('js-tags-dropdown')[0];

    const header = document.getElementsByClassName('js-header')[0];
    const main = document.getElementsByClassName('js-main')[0];
    const logo = document.getElementsByClassName('js-logo')[0];
    let logoHeight = getComputedStyle(logo).height.slice(0, getComputedStyle(logo).height.indexOf('px'));

    const svg = logo.getElementsByTagName('use')[0];
    const spritePath = 'dist/img/sprite.svg';

    window.addEventListener('resize', () => {
      logoHeight = getComputedStyle(logo).height.slice(0, getComputedStyle(logo).height.indexOf('px'));
    });

    window.addEventListener('scroll', () => {
      if ((window.pageYOffset >= logoHeight) && (window.matchMedia('(min-width: 480px) and (max-width: 1023px)').matches)) {
        header.classList.add('header--fixed');
        main.classList.add('main--fixed-header');

        aboutDropdown.classList.add('note--fixed');
        infoDropdown.classList.add('note--fixed');
      } else if ((window.pageYOffset >= logoHeight) && (window.matchMedia('(max-width: 479px)').matches)) {
        header.classList.add('header--fixed');
        main.classList.add('main--fixed-header');

        aboutDropdown.classList.add('note--fixed');
        infoDropdown.classList.add('note--fixed');
        tagsDropdown.classList.add('note--fixed');

        logo.classList.add('logo--fixed-header');
        svg.setAttribute('xlink:href', spritePath.concat('#icon-racoon-positive'));
      } else {
        header.classList.remove('header--fixed');
        main.classList.remove('main--fixed-header');

        aboutDropdown.classList.remove('note--fixed');
        infoDropdown.classList.remove('note--fixed');
        tagsDropdown.classList.remove('note--fixed');

        logo.classList.remove('logo--fixed-header');
        svg.setAttribute('xlink:href', spritePath.concat('#icon-racoon-negative'));
      }
    });
  }
}

/* @ngInject */
export default HeaderService;
