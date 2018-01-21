using AutoMapper;
using MovieDataBank.API.DTO;
using MovieDataBank.Domain;
using MovieDataBank.Domain.AggregatesModel;
using TMDbLib.Objects.Search;

namespace MovieDataBank.API.AutoMapper
{
    public class MovieProfile : Profile
    {
        public MovieProfile()
        {
            CreateMap<SearchMovie, Movie>()
                .ForMember(m => m.TMDBId, cfg => cfg.MapFrom(s => s.Id))
                .ForPath(m => m.SocialInfo.VoteCount, cfg => cfg.MapFrom(s => s.VoteCount))
                .ForPath(m => m.SocialInfo.VoteAverage, cfg => cfg.MapFrom(s => s.VoteAverage))
                .ForPath(m => m.SocialInfo.Popularity, cfg => cfg.MapFrom(s => s.Popularity))
                .ForMember(m => m.Runtime, cfg => cfg.Ignore());

            CreateMap<Movie, MovieListItemDTO>()
                .ForMember(m => m.PosterUrl, cfg => cfg.MapFrom(s => $"{MovieConstants.TMDBPosterUrl}{s.PosterPath}"));

        }
    }
}
