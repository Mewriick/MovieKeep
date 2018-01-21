using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace MovieDataBank.Domain.AggregatesModel
{
    public interface IMovieReader
    {
        Task<Movie> GetMovie(int id, string language, CancellationToken cancellationToken = default(CancellationToken));

        Task<IEnumerable<Movie>> GetMovieList(MovieDefinedListSpecification listSpecification, CancellationToken cancellationToken = default(CancellationToken));
    }
}
