using Microsoft.Extensions.Logging;
using MovieDataBank.Domain.AggregatesModel;
using System;
using System.Diagnostics;
using System.Threading;
using System.Threading.Tasks;

namespace MovieDataBank.Infrastructure.ExternalMovieDbApi
{
    public class MovieStopwatchDecorator : MovieReaderDecorator
    {
        private Stopwatch stopwatch;
        private readonly ILogger<MovieStopwatchDecorator> logger;

        public MovieStopwatchDecorator(IMovieReader movieReader, ILogger<MovieStopwatchDecorator> logger)
            : base(movieReader)
        {
            this.logger = logger ?? throw new ArgumentNullException(nameof(logger));
            stopwatch = new Stopwatch();
        }

        public override Task<Movie> GetMovie(int id, string language, CancellationToken cancellationToken = default(CancellationToken))
        {
            stopwatch.Restart();

            var movie = base.GetMovie(id, language, cancellationToken);

            logger.LogInformation($"Fetching movie detail took: {stopwatch.ElapsedMilliseconds} ms");

            return movie;
        }
    }
}
