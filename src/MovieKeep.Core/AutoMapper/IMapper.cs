namespace MovieKeep.Core.AutoMapper
{
    public interface IMapper<TEntity, TDTO>
    {
        TDTO MapToDTO(TEntity source);

        TEntity MapToEntity(TDTO source);

        void PopulateEntity(TDTO source, TEntity target);
    }
}
