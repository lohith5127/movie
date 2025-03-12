import { addMovie, rateMovie, getMovie, getAverageRating, getAllMovies } from "./movies";
import * as readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function askQuestion(query: string): Promise<string> {
  return new Promise((resolve) => rl.question(query, resolve));
}

async function main() {
  const movieCount = parseInt(await askQuestion("How many movies do you want to add? "));

  for (let i = 0; i < movieCount; i++) {
    console.log(`\nEnter details for movie ${i + 1}:`);
    const id = await askQuestion("Movie ID: ");
    const title = await askQuestion("Title: ");
    const director = await askQuestion("Director: ");
    const releaseYear = parseInt(await askQuestion("Release Year: "));
    const genre = await askQuestion("Genre: ");

    try {
      addMovie(id, title, director, releaseYear, genre);
      console.log(`Movie '${title}' added successfully!`);
    } catch (error) {
      console.error(error.message);
      i--; // Retry input if there's an error
    }
  }

  const rateMovieCount = parseInt(await askQuestion("\nHow many movies do you want to rate? "));

  for (let i = 0; i < rateMovieCount; i++) {
    const movieId = await askQuestion("Enter Movie ID to rate: ");
    const rating = parseInt(await askQuestion("Enter rating (1-5): "));

    try {
      rateMovie(movieId, rating);
      console.log(`Rating added successfully!`);
    } catch (error) {
      console.error(error.message);
      i--; // Retry input if there's an error
    }
  }

  console.log("\nMovies List:");
  console.table(getAllMovies());

  const searchMovieId = await askQuestion("\nEnter a Movie ID to get details: ");
  const movie = getMovie(searchMovieId);

  if (movie) {
    console.log("Movie Details:", movie);
    console.log("Average Rating:", getAverageRating(searchMovieId) ?? "No ratings yet");
  } else {
    console.log("Movie not found.");
  }

  rl.close();
}

main();
