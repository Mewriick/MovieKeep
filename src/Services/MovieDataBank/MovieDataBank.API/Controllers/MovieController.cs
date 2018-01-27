using Microsoft.AspNetCore.Mvc;
using MovieDataBank.API.DTO;
using MovieDataBank.Domain;
using MovieDataBank.Domain.AggregatesModel;
using MovieKeep.Core.AutoMapper;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MovieDataBank.API.Controllers
{
    [Route("api/[controller]")]
    public class MovieController : Controller
    {
        private readonly IMovieReader movieReader;
        private readonly IMapper<IEnumerable<Movie>, IEnumerable<MovieListItemDTO>> mapperMovieListItem;

        public MovieController(IMovieReader movieReader, IMapper<IEnumerable<Movie>, IEnumerable<MovieListItemDTO>> mapperMovieListItem)
        {
            this.movieReader = movieReader ?? throw new ArgumentNullException(nameof(movieReader));
            this.mapperMovieListItem = mapperMovieListItem ?? throw new ArgumentNullException(nameof(mapperMovieListItem));
        }

        [HttpGet]
        public async Task<IEnumerable<MovieListItemDTO>> Get()
        {
            var movies = await movieReader.GetMovieList(new MovieDefinedListSpecification());

            return mapperMovieListItem.MapToDTO(movies);
        }

        [HttpGet("{id}")]
        public async Task<Movie> Get(int id)
        {
            var movie = await movieReader.GetMovie(id, "en-US");

            return movie;
        }
    }
}
