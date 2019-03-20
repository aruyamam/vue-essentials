<template>
  <div id="movie-list">
    <div v-for="movie in filteredMovies" class="movie">{{ movie.title }}</div>
  </div>
</template>
<script>
import genres from "../util/genres";

export default {
  data() {
    return {
      movies: [
        { title: "Kill Bill", genre: genres.CRIME },
        { title: "Home Alone", genre: genres.COMEDY },
        { title: "Autstin Powers", genre: genres.COMEDY }
      ]
    };
  },
  props: ["genre", "time"],
  methods: {
    moviePassesGenreFilter(movie) {
      if (!this.genre.length) {
        return true;
      }

      return this.genre.find(genre => movie.genre === genre);
    }
  },
  computed: {
    filteredMovies() {
      return this.movies.filter(this.moviePassesGenreFilter);
    }
  }
};
</script>

