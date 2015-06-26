using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GotChamp.Repository
{
    public interface IRepository<TEntity> 
    {
        void Create(TEntity entity);
        void Update(string id, TEntity entity);
        TEntity FindById(string id);
        List<TEntity> FindAll();
        void Delete(string id);

    }
}
