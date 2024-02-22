using Bestellung.Backend;
using Bestellung.Core.Repositories;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace Bestellung.Database
{
    public class Repository<TEntity> : IRepository<TEntity> where TEntity : class
    {
        protected readonly DbSet<TEntity> entities;
        protected readonly ApplicationDbContext context;

        public Repository(ApplicationDbContext context)
        {
            this.context = context;
            this.entities = this.context.Set<TEntity>();
        }

        public List<TEntity> GetAll()
        {
            return this.entities.ToList();
        }

        public virtual TEntity GetById(Guid Id)
        {
            return this.entities.Find(Id);
        }

        public async Task Update(TEntity entity)
        {
            this.entities.Update(entity);
            await this.context.SaveChangesAsync();
        }

        public async Task Delete(Guid Id)
        {
            var entityToDelete = GetById(Id);
            if (entityToDelete != null)
            {
                this.entities.Remove(entityToDelete);
                await this.context.SaveChangesAsync();
            }
        }

        public async Task Add(TEntity entity)
        {
            this.entities.Add(entity);
            await this.context.SaveChangesAsync();
        }

    }
}
