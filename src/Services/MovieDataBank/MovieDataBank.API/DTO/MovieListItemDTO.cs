using System;

namespace MovieDataBank.API.DTO
{
    public class MovieListItemDTO
    {
        public string Title { get; set; }

        public DateTime? ReleaseDate { get; set; }

        public string Overview { get; set; }

        public double SocialInfoPopularity { get; set; }

        public double SocialInfoVoteAverage { get; set; }

        public string PosterUrl { get; set; }

        public int TMDBId { get; set; }
    }
}
