using MovieDataBank.Domain;
using MovieDataBank.Domain.AggregatesModel;
using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace MovieDataBank.Infrastructure.ExternalMovieDbApi
{
    public abstract class MovieReaderDecorator : IMovieReader
    {
        private readonly IMovieReader movieReader;

        public MovieReaderDecorator(IMovieReader movieReader)
        {
            this.movieReader = movieReader ?? throw new ArgumentNullException(nameof(movieReader));
        }

        public virtual Task<Movie> GetMovie(int id, string language, CancellationToken cancellationToken = default(CancellationToken))
        {
            return movieReader.GetMovie(id, language, cancellationToken);
        }

        public virtual Task<IEnumerable<Movie>> GetMovieList(MovieDefinedListSpecification listSpecification, CancellationToken cancellationToken = default(CancellationToken))
        {
            return movieReader.GetMovieList(listSpecification, cancellationToken);
        }
    }
}
