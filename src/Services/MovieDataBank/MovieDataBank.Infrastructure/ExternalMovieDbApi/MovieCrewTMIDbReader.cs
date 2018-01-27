using Microsoft.Extensions.Caching.Memory;
using MovieDataBank.Domain.AggregatesModel;
using MovieKeep.Core.AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using TMDbLib.Client;
using TMDbLib.Objects.Movies;

namespace MovieDataBank.Infrastructure.ExternalMovieDbApi
{
    public class MovieCrewTMIDbReader : IMovieActorsReader, IMovieCrewReader
    {
        private const int MainActorsOrderTreshold = 5;
        private readonly TimeSpan MovieDetailCacheTime = TimeSpan.FromMinutes(15);

        private readonly IMemoryCache memoryCache;
        private readonly TMDbClient tMDbClient;
        private readonly IMapper<IEnumerable<MovieActor>, IEnumerable<Cast>> actorMapper;


        public MovieCrewTMIDbReader(
            TMDbClient tMDbClient,
            IMemoryCache memoryCache,
            IMapper<IEnumerable<MovieActor>, IEnumerable<Cast>> actorMapper)
        {
            this.tMDbClient = tMDbClient ?? throw new ArgumentNullException(nameof(tMDbClient));
            this.memoryCache = memoryCache ?? throw new ArgumentNullException(nameof(tMDbClient));
            this.actorMapper = actorMapper ?? throw new ArgumentNullException(nameof(actorMapper));
        }

        public async Task<IEnumerable<MovieActor>> GetMainActors(int movieId, CancellationToken cancellationToken = default(CancellationToken))
        {
            var credits = await GetMovieWholeCrew(movieId, cancellationToken);
            if (credits == null || credits.Cast == null)
            {
                return new List<MovieActor>();
            }

            var mainCast = credits.Cast.Where(c => c.Order <= MainActorsOrderTreshold);

            return actorMapper.MapToEntity(mainCast);
        }

        public Task<IEnumerable<MovieWorker>> GetMovieDirectors(int movieId, CancellationToken cancellationToken = default(CancellationToken))
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<MovieWorker>> GetMovieWriters(int movieId, CancellationToken cancellationToken = default(CancellationToken))
        {
            throw new NotImplementedException();
        }

        private async Task<Credits> GetMovieWholeCrew(int movieId, CancellationToken cancellationToken = default(CancellationToken))
        {
            if (memoryCache.TryGetValue(movieId, out Credits value))
            {
                return value;
            }

            var result = await tMDbClient.GetMovieCreditsAsync(movieId, cancellationToken);
            memoryCache.Set(movieId, result, new MemoryCacheEntryOptions { SlidingExpiration = MovieDetailCacheTime });

            return result;
        }
    }
}
