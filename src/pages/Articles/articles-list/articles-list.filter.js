const ArticlesListFilter = () =>
  (input, criteria) => {
    let output = [];
    if (criteria.slice(0, 1) === '#') {
      input.forEach((item) => {
        if (~item.tags.indexOf(criteria.slice(1))) {
          output.push(item);
        }
      });
    } else if (criteria !== '') {
      input.forEach((item) => {
        if ((~item.author.indexOf(criteria)) || (~item.title.indexOf(criteria))
        || (~item.content.indexOf(criteria)) || (~item.tags.indexOf(criteria))) {
          output.push(item);
        }
      });
    } else {
      output = input;
    }
    return output;
  };

export default ArticlesListFilter;
