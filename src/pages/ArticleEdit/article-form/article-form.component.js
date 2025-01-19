import template from './article-form.html';

const ArticleFormComponent = {
  template,
  controller: /* @ngInject */ class ArticleFormComponent {
    constructor($location, $filter, ArticleFormService, Upload) {
      this.$location = $location;
      this.$filter = $filter;
      this.articleFormService = ArticleFormService;
      this.Upload = Upload;
    }

    $onInit() {
      const path = this.$location.path();
      const num = path.search(/\d/);
      if (~num) {
        this.id = path.slice(num);
      }

      if (this.id) {
        this.articleFormService.Article().get({ id: this.id }, (data) => {
          this.article = data;
          this.articleTags = this.article.tags.join(' ');
          this.charcount = this.article.content.length;
        });
      } else {
        this.charcount = 0;
      }

      this.allTagsResource = this.articleFormService.Tags().query(() => {
        this.allTags = [];
        this.allTagsResource.forEach((resource) => {
          this.allTags.push(resource.tagName);
        });
      });
    }

    uploadFile(uploadingFile) {
      this.Upload.upload({
        url: '/api/upload',
        method: 'POST',
        data: { file: uploadingFile }
      }).then(response => response.data);
    }

    routeBack() {
      this.$location.path('/');
    }

    addNewTags(newTags) {
      newTags.forEach((item) => {
        if (this.allTags.indexOf(item) === -1) {
          this.articleFormService.Tags().save({ tagName: item });
        }
      });
    }

    onChangeContent() {
      this.charcount = this.article.content.length;
    }

    onChangeTags() {
      this.article.tags = this.articleTags.split(' ');
    }

    onClickCancel() {
      this.$location.path('/');
    }

    onSubmit() {
      if (this.file) {
        this.uploadFile(this.file);
        this.article.image = this.file.name;
      }

      this.article.date = this.$filter('date')(new Date(), 'HH:MM MMM d, yyyy');
      this.article.tags = document.getElementById('tags').value.split(' ');

      if (this.id) {
        this.articleFormService.Article().update({ id: this.id }, this.article, () => {
          this.addNewTags(this.article.tags);
          this.routeBack();
        });
      } else {
        this.article.socials = {
          facebook: 0,
          gplus: 0,
          twitter: 0,
          vk: 0,
          yaru: 0
        };
        this.articleFormService.Articles().save(this.article, () => {
          this.addNewTags(this.article.tags);
          this.routeBack();
        });
      }
    }
  }
};

export default ArticleFormComponent;
