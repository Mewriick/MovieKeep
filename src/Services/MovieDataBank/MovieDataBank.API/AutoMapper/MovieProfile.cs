using AutoMapper;
using MovieDataBank.API.DTO;
using MovieDataBank.Domain;
using MovieDataBank.Domain.AggregatesModel;
using System;
using System.Linq;
using TMDbLib.Objects.Movies;
using TMDbLib.Objects.Search;

namespace MovieDataBank.API.AutoMapper
{
    public class MovieProfile : Profile
    {
        public MovieProfile()
        {
            CreateMap<SearchMovie, Domain.AggregatesModel.Movie>()
                .ForMember(m => m.TMDBId, cfg => cfg.MapFrom(s => s.Id))
                .ForPath(m => m.SocialInfo.VoteCount, cfg => cfg.MapFrom(s => s.VoteCount))
                .ForPath(m => m.SocialInfo.VoteAverage, cfg => cfg.MapFrom(s => s.VoteAverage))
                .ForPath(m => m.SocialInfo.Popularity, cfg => cfg.MapFrom(s => s.Popularity))
                .ForMember(m => m.Runtime, cfg => cfg.Ignore())
                .ForMember(m => m.RuntimeMins, cfg => cfg.Ignore())
                .ForMember(m => m.Gendres, cfg => cfg.Ignore())
                .ForMember(m => m.Budget, cfg => cfg.Ignore())
                .ForMember(m => m.Revenue, cfg => cfg.Ignore())
                .ForMember(m => m.Actors, cfg => cfg.Ignore())
                .ForMember(m => m.ProductionCountries, cfg => cfg.Ignore())
                ;

            CreateMap<Domain.AggregatesModel.Movie, MovieListItemDTO>()
                .ForMember(m => m.PosterUrl, cfg => cfg.MapFrom(s => $"{MovieConstants.TMDBPosterUrl}{s.PosterPath}"));

            CreateMap<TMDbLib.Objects.Movies.Movie, Domain.AggregatesModel.Movie>()
                .ForMember(m => m.TMDBId, cfg => cfg.MapFrom(s => s.Id))
                .ForPath(m => m.SocialInfo.VoteCount, cfg => cfg.MapFrom(s => s.VoteCount))
                .ForPath(m => m.SocialInfo.VoteAverage, cfg => cfg.MapFrom(s => s.VoteAverage))
                .ForPath(m => m.SocialInfo.Popularity, cfg => cfg.MapFrom(s => s.Popularity))
                .ForMember(m => m.Runtime, cfg => cfg.MapFrom(tm => TimeSpan.FromMinutes(tm.Runtime ?? 0)))
                .ForMember(m => m.RuntimeMins, cfg => cfg.MapFrom(tm => tm.Runtime))
                .ForMember(m => m.Gendres, cfg => cfg.MapFrom(tm => tm.Genres.Select(g => g.Name)))
                .ForMember(m => m.PosterPath, cfg => cfg.MapFrom(s => $"{MovieConstants.TMDBPosterUrl}{s.PosterPath}"))
                .ForMember(m => m.Actors, cfg => cfg.Ignore())
                ;

            CreateMap<Cast, MovieActor>()
                .ForMember(m => m.TMDBId, cfg => cfg.MapFrom(s => s.Id))
                .ForMember(m => m.ProfileImageUrl, cfg => cfg.MapFrom(s => $"{MovieConstants.TMDBPosterUrl}{s.ProfilePath}"))
                ;

            CreateMap<TMDbLib.Objects.Movies.ProductionCountry, Domain.AggregatesModel.ProductionCountry>()
                .ForMember(m => m.Code, cfg => cfg.MapFrom(p => p.Iso_3166_1));

        }
    }
}
