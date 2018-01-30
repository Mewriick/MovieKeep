using System.Collections.Generic;

namespace MovieDataBank.Domain.AggregatesModel
{
    public class MovieCrew
    {
        public ICollection<MovieWorker> Directors { get; set; }

        public ICollection<MovieWorker> Writers { get; set; }

        public ICollection<MovieWorker> MusicComposers { get; set; }

        public ICollection<MovieWorker> Cameramen { get; set; }

        public MovieCrew()
        {
            Directors = new List<MovieWorker>();
            Writers = new List<MovieWorker>();
            MusicComposers = new List<MovieWorker>();
            Cameramen = new List<MovieWorker>();
        }
    }
}
