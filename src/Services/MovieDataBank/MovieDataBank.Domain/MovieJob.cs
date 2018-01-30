namespace MovieDataBank.Domain
{
    public sealed class MovieJob
    {
        private readonly string name;
        private readonly int value;

        public static readonly MovieJob Director = new MovieJob(1, "Director");
        public static readonly MovieJob Writer = new MovieJob(2, "Writer");
        public static readonly MovieJob Music = new MovieJob(3, "Music");
        public static readonly MovieJob Camera = new MovieJob(4, "Director of Photography");

        private MovieJob(int value, string name)
        {
            this.name = name;
            this.value = value;
        }

        public override string ToString()
        {
            return name;
        }
    }
}
