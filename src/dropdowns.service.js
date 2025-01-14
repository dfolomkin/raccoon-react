/* eslint class-methods-use-this: "off" */

class DropdownsService {
  activate() {
    const navbar = document.getElementsByClassName('js-navbar')[0];
    const aboutButton = document.getElementsByClassName('js-about-button')[0];
    const infoButton = document.getElementsByClassName('js-info-button')[0];
    const tagsButton = document.getElementsByClassName('js-tags-button')[0];
    const menuButton = document.getElementsByClassName('js-menu-button')[0];

    const aboutDropdown = document.getElementsByClassName('js-about-dropdown')[0];
    const infoDropdown = document.getElementsByClassName('js-info-dropdown')[0];
    const tagsDropdown = document.getElementsByClassName('js-tags-dropdown')[0];
    const menuDropdown = document.getElementsByClassName('js-menu-dropdown')[0];

    const controls = {
      about: [aboutButton, aboutDropdown],
      info: [infoButton, infoDropdown],
      tags: [tagsButton, tagsDropdown],
      menu: [menuButton, menuDropdown]
    };

    const dropdownZIndex = aboutDropdown.style.zIndex;

    const aside = document.getElementsByClassName('js-aside')[0];
    const aboutClose = document.getElementsByClassName('js-about-close')[0];
    const infoClose = document.getElementsByClassName('js-info-close')[0];
    const tagsClose = document.getElementsByClassName('js-tags-close')[0];

    const activateControl = (control) => {
      const ctrls = Object.entries(controls);
      ctrls.forEach((ctrl) => {
        if (ctrl[0] === control) {
          ctrl[1][1].style.zIndex = dropdownZIndex;
          ctrl[1][1].classList.toggle('note--down');
          ctrl[1][0].classList.toggle('navbar__button--active');
        } else {
          ctrl[1][1].style.zIndex = dropdownZIndex - 1;
          if (ctrl[1][1].classList.contains('note--down')) {
            ctrl[1][1].classList.remove('note--down');
            ctrl[1][0].classList.remove('navbar__button--active');
          }
        }
      });
    }

    // closest polyfill with regular expressions
    const closest = (element, regExp, nest) => {
      let i = nest || 5;
      while (i-- && element) {
        if (~element.classList.value.search(regExp)) {
          return element;
        } else { // eslint-disable-line no-else-return
          element = element.parentElement; // eslint-disable-line no-param-reassign
        }
      }
      return null;
    }

    navbar.addEventListener('click', (event) => {
      const target = closest(event.target, /js-.*-button/);
      switch (target) {
        case aboutButton:
          activateControl('about');
          break;
        case infoButton:
          activateControl('info');
          break;
        case tagsButton:
          activateControl('tags');
          break;
        case menuButton:
          activateControl('menu');
          break;
        default:
          break;
      }
    });

    aside.addEventListener('click', (event) => {
      const target = closest(event.target, /js-.*-close/);
      switch (target) {
        case aboutClose:
          activateControl('about');
          break;
        case infoClose:
          activateControl('info');
          break;
        case tagsClose:
          activateControl('tags');
          break;
        default:
          break;
      }
    });
  }
}

/* @ngInject */
export default DropdownsService;
