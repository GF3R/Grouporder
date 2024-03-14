using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bestellung.Core.Repositories
{
    public interface IRepository<TEntity> where TEntity : class
    {
        List<TEntity> GetAll();
        TEntity GetById(Guid Id);
        Task Add(TEntity entity);
        Task Delete(Guid Id);
        Task Update(TEntity entity);
    }
}
