using Microsoft.Extensions.Caching.Memory;
using MovieDataBank.Domain;
using MovieDataBank.Domain.AggregatesModel;
using MovieKeep.Core;
using MovieKeep.Core.AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using TMDbLib.Client;
using TMDbLib.Objects.General;
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
        private readonly IMapper<IEnumerable<MovieWorker>, IEnumerable<Crew>> crewMapper;

        public MovieCrewTMIDbReader(
            TMDbClient tMDbClient,
            IMemoryCache memoryCache,
            IMapper<IEnumerable<MovieActor>, IEnumerable<Cast>> actorMapper,
            IMapper<IEnumerable<MovieWorker>, IEnumerable<Crew>> crewMapper)
        {
            this.tMDbClient = tMDbClient ?? throw new ArgumentNullException(nameof(tMDbClient));
            this.memoryCache = memoryCache ?? throw new ArgumentNullException(nameof(tMDbClient));
            this.actorMapper = actorMapper ?? throw new ArgumentNullException(nameof(actorMapper));
            this.crewMapper = crewMapper ?? throw new ArgumentNullException(nameof(crewMapper));
        }

        public async Task<IEnumerable<MovieActor>> GetMainActors(int movieId, CancellationToken cancellationToken = default(CancellationToken))
        {
            var credits = await GetMovieWholeCrew(movieId, cancellationToken);
            if (credits == null || credits.Cast.NullOrEmpty())
            {
                return new List<MovieActor>();
            }

            var mainCast = credits.Cast.Where(c => c.Order <= MainActorsOrderTreshold);

            return actorMapper.MapToEntity(mainCast);
        }

        public async Task<IEnumerable<MovieWorker>> GetMovieCameramen(int movieId, CancellationToken cancellationToken = default(CancellationToken))
        {
            return await GetCrewByJob(movieId, MovieJob.Camera, cancellationToken);
        }

        public async Task<IEnumerable<MovieWorker>> GetMovieDirectors(int movieId, CancellationToken cancellationToken = default(CancellationToken))
        {
            return await GetCrewByJob(movieId, MovieJob.Director, cancellationToken);
        }

        public async Task<IEnumerable<MovieWorker>> GetMovieMusicComposers(int movieId, CancellationToken cancellationToken = default(CancellationToken))
        {
            return await GetCrewByJob(movieId, MovieJob.Music, cancellationToken);

        }

        public async Task<IEnumerable<MovieWorker>> GetMovieWriters(int movieId, CancellationToken cancellationToken = default(CancellationToken))
        {
            return await GetCrewByJob(movieId, MovieJob.Writer, cancellationToken);
        }

        private async Task<IEnumerable<MovieWorker>> GetCrewByJob(int movieId, MovieJob movieJob, CancellationToken cancellationToken)
        {
            var credits = await GetMovieWholeCrew(movieId, cancellationToken);
            if (credits == null || credits.Crew.NullOrEmpty())
            {
                return new List<MovieWorker>();
            }

            var directors = credits.Crew.Where(c => c.Job.Equals(movieJob.ToString(), StringComparison.InvariantCultureIgnoreCase));

            return crewMapper.MapToEntity(directors);
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
