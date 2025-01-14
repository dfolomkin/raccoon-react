import template from './socials-list.html';

const SocialListComponent = {
  bindings: {
    socials: '<'
  },
  template,
  controller: class SocialListComponent {
    $onInit() {
      const socialsObject = this.socials;
      const socialsArray = [];

      Object.keys(socialsObject).forEach((key) => {
        socialsArray.push({
          name: key,
          count: socialsObject[key]
        });
      });

      this.socialsAsArray = socialsArray;
    }
  }
};

export default SocialListComponent;
