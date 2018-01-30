using System.Collections.Generic;
using System.Linq;

namespace MovieKeep.Core
{
    public static class ListExtensions
    {
        public static bool NullOrEmpty<T>(this IEnumerable<T> enumerable)
        {
            return enumerable == null || !enumerable.Any();
        }
    }
}
