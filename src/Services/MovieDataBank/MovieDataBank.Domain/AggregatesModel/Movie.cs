using System;
using System.Collections.Generic;

namespace MovieDataBank.Domain.AggregatesModel
{
    public class Movie : TMDBEntity
    {
        public string Title { get; set; }

        public DateTime? ReleaseDate { get; set; }

        public TimeSpan? Runtime { get; set; }

        public string Overview { get; set; }

        public string PosterPath { get; set; }

        public MovieSocialInfo SocialInfo { get; set; }

        public long Revenue { get; set; }

        public long Budget { get; set; }

        public List<string> Gendres { get; set; }

        public ICollection<MovieActor> Actors { get; set; }

        public Movie()
        {
            SocialInfo = new MovieSocialInfo();
            Gendres = new List<string>();
            Actors = new HashSet<MovieActor>();
        }
    }
}
