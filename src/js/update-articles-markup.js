import articlesTpl from '../templates/articles.hbs';
import refs from './refs';

const updateArticlesMarkup = articles => {
  const markup = articlesTpl(articles);
  refs.articlesContainer.insertAdjacentHTML('beforeend', markup);
};

export default updateArticlesMarkup;
