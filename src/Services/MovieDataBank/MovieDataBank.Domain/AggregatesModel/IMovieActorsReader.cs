using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace MovieDataBank.Domain.AggregatesModel
{
    public interface IMovieActorsReader
    {
        Task<IEnumerable<MovieActor>> GetMainActors(int movieId, CancellationToken cancellationToken = default(CancellationToken));
    }
}
