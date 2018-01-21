using System;

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

        public Movie()
        {
            SocialInfo = new MovieSocialInfo();
        }
    }
}
