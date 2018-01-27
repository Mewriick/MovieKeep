namespace MovieDataBank.Domain.AggregatesModel
{
    public class MovieWorker : TMDBEntity
    {
        public string Name { get; set; }

        public string ProfileImageUrl { get; set; }

        public PersonGender Gender { get; set; }
    }
}
