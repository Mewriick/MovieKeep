using MovieKeep.Core;
using System;
using System.Collections.Generic;
using System.Linq;

namespace MovieDataBank.Domain.AggregatesModel
{
    public class Movie : TMDBEntity
    {
        public string Title { get; set; }

        public DateTime? ReleaseDate { get; set; }

        public TimeSpan? Runtime { get; set; }

        public int RuntimeMins { get; set; } // Temp

        public string Overview { get; set; }

        public string PosterPath { get; set; }

        public MovieSocialInfo SocialInfo { get; set; }

        public long Revenue { get; set; }

        public long Budget { get; set; }

        public List<string> Gendres { get; set; }

        public ICollection<MovieActor> Actors { get; set; }

        public ICollection<ProductionCountry> ProductionCountries { get; set; }

        public MovieCrew Crew { get; set; }

        public Movie()
        {
            SocialInfo = new MovieSocialInfo();
            Gendres = new List<string>();
            Actors = new List<MovieActor>();
            ProductionCountries = new List<ProductionCountry>();
            Crew = new MovieCrew();
        }

        public Movie WithDirectors(IEnumerable<MovieWorker> directors)
        {
            if (Crew == null || directors.NullOrEmpty())
            {
                return this;
            }

            Crew.Directors = directors.ToList();

            return this;
        }

        public Movie WithWriters(IEnumerable<MovieWorker> writers)
        {
            if (Crew == null || writers.NullOrEmpty())
            {
                return this;
            }

            Crew.Writers = writers.ToList();

            return this;
        }

        public Movie WithMusicComposers(IEnumerable<MovieWorker> musicComposers)
        {
            if (Crew == null || musicComposers.NullOrEmpty())
            {
                return this;
            }

            Crew.MusicComposers = musicComposers.ToList();

            return this;
        }

        public Movie WithCameramen(IEnumerable<MovieWorker> cameramen)
        {
            if (Crew == null || cameramen.NullOrEmpty())
            {
                return this;
            }

            Crew.Cameramen = cameramen.ToList();

            return this;
        }
    }
}
