using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ToDoApp.Data;
using ToDoApp.Models;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ToDoApp.Controllers
{
    public class TodoController : Controller
    {
        private readonly ApplicationDbContext _db;

        public TodoController(ApplicationDbContext db) {
            _db = db;
        }

        public IActionResult Index()
        {
            List<Todo> todoList = _db.Todos.ToList();
            return View(todoList);
        }

        public IActionResult Create()
        {
            return View();
        }

        public IActionResult Edit(int Id)
        {
            var todotoEdit = _db.Todos.Find(Id);
            return View(todotoEdit);
        }

        [HttpPost]
        public IActionResult Create(Todo obj)
        {  
            if (ModelState.IsValid)
            { 
                _db.Todos.Add(obj);
                _db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View();
        }

        [HttpPost]
        public IActionResult Delete(int Id)
        {
            var todotoDelete = _db.Todos.Find(Id);
            _db.Remove(todotoDelete);
            _db.SaveChanges();
            return RedirectToAction("Index");
        }


        [HttpPost]
        public IActionResult Edit(Todo todo)
        {
            _db.Update(todo);
            _db.SaveChanges();
            return RedirectToAction("Index");
        }
    }
}

