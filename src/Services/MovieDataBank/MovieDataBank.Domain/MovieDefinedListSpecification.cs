using System;

namespace MovieDataBank.Domain
{
    public class MovieDefinedListSpecification
    {
        public int Page { get; } = 1;

        public string LanguageCode { get; } = "en-US";

        public MovieDefinedLists ListName { get; } = MovieDefinedLists.NowPlaying;

        public MovieDefinedListSpecification()
        {
        }

        public MovieDefinedListSpecification(int page, MovieDefinedLists definedListsName, string languageCode)
        {
            if (page <= 0)
            {
                throw new ArgumentException($"Parameter {nameof(page)} must be greater than zero");
            }

            Page = page;
            ListName = definedListsName;
            LanguageCode = languageCode;
        }
    }
}
