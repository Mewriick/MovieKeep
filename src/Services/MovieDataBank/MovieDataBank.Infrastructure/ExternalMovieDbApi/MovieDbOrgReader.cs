using MovieDataBank.Domain;
using MovieDataBank.Domain.AggregatesModel;
using MovieKeep.Core.AutoMapper;
using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using TMDbLib.Client;
using TMDbLib.Objects.Search;

namespace MovieDataBank.Infrastructure.ExternalMovieDbApi
{
    public class MovieDbOrgReader : IMovieReader
    {
        private readonly TMDbClient tMDbClient;
        private readonly IMapper<List<Movie>, List<SearchMovie>> listMapper;

        public MovieDbOrgReader(TMDbClient tMDbClient, IMapper<List<Movie>, List<SearchMovie>> listMapper)
        {
            this.tMDbClient = tMDbClient ?? throw new ArgumentNullException(nameof(tMDbClient));
            this.listMapper = listMapper ?? throw new ArgumentNullException(nameof(listMapper));
        }

        public Task<Movie> GetMovie(int id, string language, CancellationToken cancellationToken = default(CancellationToken))
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<Movie>> GetMovieList(MovieDefinedListSpecification listSpecification, CancellationToken cancellationToken = default(CancellationToken))
        {
            var apiResult = await tMDbClient.GetMovieNowPlayingListAsync(listSpecification.LanguageCode, listSpecification.Page, string.Empty, cancellationToken);

            return listMapper.MapToEntity(apiResult.Results);
        }
    }
}
