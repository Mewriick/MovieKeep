using AutoMapper;
using MovieKeep.Core.AutoMapper;

namespace MovieDataBank.API.AutoMapper
{
    public class AutoMapper<TEntity, TDTO> : IMapper<TEntity, TDTO>
    {
        public TDTO MapToDTO(TEntity source)
        {
            return Mapper.Map<TDTO>(source);
        }

        public TEntity MapToEntity(TDTO source)
        {
            return Mapper.Map<TEntity>(source);
        }

        public void PopulateEntity(TDTO source, TEntity target)
        {
            Mapper.Map(source, target);
        }
    }
}
