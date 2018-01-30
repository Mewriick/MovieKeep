using AutoMapper;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using MovieDataBank.API.AutoMapper;
using MovieDataBank.Domain.AggregatesModel;
using MovieDataBank.Domain.Options;
using MovieDataBank.Infrastructure.ExternalMovieDbApi;
using MovieKeep.Core.AutoMapper;
using System.Reflection;
using TMDbLib.Client;

namespace MovieDataBank.API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc();
            services.AddOptions();
            services.AddLogging();
            services.AddCors();
            services.AddMemoryCache();

            services.Configure<TMDBInfo>(Configuration);
            services.AddSingleton(typeof(TMDbClient), new TMDbClient(Configuration["TMDBInfo:ApiKey"]));
            services.AddScoped<MovieDbOrgReader>();
            services.AddScoped<IMovieReader, MovieStopwatchDecorator>(s => new MovieStopwatchDecorator(
                s.GetRequiredService<MovieDbOrgReader>(),
                s.GetRequiredService<ILogger<MovieStopwatchDecorator>>()
                ));

            services.AddScoped<IMovieActorsReader, MovieCrewTMIDbReader>();
            services.AddScoped<IMovieCrewReader, MovieCrewTMIDbReader>();

            AddAutoMapper(services);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseCors(builder =>
                  builder
                  .WithOrigins("http://localhost")
                  .AllowAnyOrigin());
            }

            app.UseMvc();

            loggerFactory.AddDebug();
            loggerFactory.AddConsole();
        }

        private void AddAutoMapper(IServiceCollection services)
        {
            var apiAssembly = Assembly.GetExecutingAssembly();
            services.AddAutoMapper(new Assembly[] { apiAssembly });
            services.AddSingleton(typeof(IMapper<,>), typeof(AutoMapper<,>));

            Mapper.Configuration.AssertConfigurationIsValid();
        }
    }
}
