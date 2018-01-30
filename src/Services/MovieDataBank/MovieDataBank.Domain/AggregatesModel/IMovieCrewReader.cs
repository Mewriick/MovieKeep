using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace MovieDataBank.Domain.AggregatesModel
{
    public interface IMovieCrewReader
    {
        Task<IEnumerable<MovieWorker>> GetMovieDirectors(int movieId, CancellationToken cancellationToken = default(CancellationToken));

        Task<IEnumerable<MovieWorker>> GetMovieWriters(int movieId, CancellationToken cancellationToken = default(CancellationToken));

        Task<IEnumerable<MovieWorker>> GetMovieMusicComposers(int movieId, CancellationToken cancellationToken = default(CancellationToken));

        Task<IEnumerable<MovieWorker>> GetMovieCameramen(int movieId, CancellationToken cancellationToken = default(CancellationToken));
    }
}
