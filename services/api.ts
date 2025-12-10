export const TMBD_config = {
    BASE_URL: 'https://api.themoviedb.org/3',
    API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
    hedaers: {
        accept: 'application/json',
        authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`
    }
}

export const fetchMovies = async({ query }: { query: string }) => {
    const endpoint = query
    ? `${TMBD_config.BASE_URL}/search/movie?query=${encodeURIComponent(query)}`:
    `${TMBD_config.BASE_URL}/discover/movie?sort_by=popularity.desc`;

    const response = await fetch(endpoint, {
        method: 'GET',
        headers: TMBD_config.hedaers
    });

    if(!response.ok){
        throw new Error(`Failed to fetch movies: ${response.statusText}`);
    }

    const data = await response.json();

    return data.results;
}