﻿using MovieDataBank.Domain;
using MovieDataBank.Domain.AggregatesModel;
using MovieKeep.Core.AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using TMDbLib.Client;
using TMDbLib.Objects.Search;

namespace MovieDataBank.Infrastructure.ExternalMovieDbApi
{
    public class MovieDbOrgReader : IMovieReader
    {
        private readonly TMDbClient tMDbClient;
        private readonly IMovieActorsReader movieActorsReader;
        private readonly IMapper<List<Movie>, List<SearchMovie>> listMapper;
        private readonly IMapper<Movie, TMDbLib.Objects.Movies.Movie> detailMapper;

        public MovieDbOrgReader(
            TMDbClient tMDbClient,
            IMovieActorsReader movieActorsReader,
            IMapper<List<Movie>, List<SearchMovie>> listMapper,
            IMapper<Movie, TMDbLib.Objects.Movies.Movie> detailMapper)
        {
            this.tMDbClient = tMDbClient ?? throw new ArgumentNullException(nameof(tMDbClient));
            this.movieActorsReader = movieActorsReader ?? throw new ArgumentNullException(nameof(movieActorsReader));
            this.listMapper = listMapper ?? throw new ArgumentNullException(nameof(listMapper));
            this.detailMapper = detailMapper ?? throw new ArgumentNullException(nameof(detailMapper));
        }

        public async Task<Movie> GetMovie(int id, string language, CancellationToken cancellationToken = default(CancellationToken))
        {
            var movieResult = await tMDbClient.GetMovieAsync(id);
            var actors = await movieActorsReader.GetMainActors(id, cancellationToken);

            var movie = detailMapper.MapToEntity(movieResult);
            movie.Actors = actors.ToList();

            return movie;
        }

        public async Task<IEnumerable<Movie>> GetMovieList(MovieDefinedListSpecification listSpecification, CancellationToken cancellationToken = default(CancellationToken))
        {
            var apiResult = await tMDbClient.GetMovieNowPlayingListAsync(listSpecification.LanguageCode, listSpecification.Page, string.Empty, cancellationToken);

            return listMapper.MapToEntity(apiResult.Results);
        }
    }
}
