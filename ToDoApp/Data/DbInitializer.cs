using System;
using ToDoApp.Models;

namespace ToDoApp.Data
{
    public class DbInitializer
    {
        public static void Initialize(ApplicationDbContext db)
        {
            if (db.Todos.Any())
            {
                return;
            }

            var todoList = new[]
            {
                new Todo { Title = "Make", Description = "Make electronics" },
                new Todo { Title = "Make Notes", Description = "Make notes" },
            };

            foreach (var todo in todoList)
            {
                db.Todos.Add(todo);
            }

            db.SaveChanges();
        }
    }
}
