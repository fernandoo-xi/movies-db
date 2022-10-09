import { format } from 'date-fns';

export default class MovieApiService {
  _apiBase = 'https://api.themoviedb.org/3/search/movie';
  _apiKey = '57c2da34a7f34c1d281aa8e1c3a9ffa5&query';

  async getResource(query) {
    const res = await fetch(`${this._apiBase}?api_key=${this._apiKey}&query=${query}`);

    if (!res.ok) {
      throw new Error(`${this._apiBase}?api_key=${this._apiKey}&query=${query}`);
    }

    return await res.json();
  }

  async getText(value) {
    const info = await this.getResource(value);
    return this._tranformApiResourse(info.results);
  }

  cutDescription(text) {
    let cutText = text.split(' ');
    cutText = cutText.slice(0, 36);
    return cutText.join(' ');
  }

  _tranformApiResourse(results) {
    return {
      image: results[0].poster_path,
      title: results[0].title,
      genre: results[0].genre_ids,
      date: format(new Date(results[0].release_date), 'MMMM dd, yyyy'),
      description: `${this.cutDescription(results[0].overview)} ...`,
    };
  }
}
