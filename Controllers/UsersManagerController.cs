using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Mvc3UsersManagement.Controllers
{
    public class UsersManagerController : Controller
    {
        //
        // GET: /UsersManager/

        public ActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public JsonResult GetUsers()
        {
            if (Session["users"] == null)
            {
                Session["users"] = new List<User> { 
                new User{ id = 1, name = "moshe" , email="moshe@gmail.com", groupsList=new List<Group>{new Group{id = 2, name = "שומרים"}} },
                new User{ id = 2, name = "shlomo",  email="shlomo@gmail.com", groupsList=new List<Group>{new Group{id = 1, name = "מנהלים"}}},
                new User{ id = 3, name = "sasha",  email="sasha@gmail.com"},
                new User{ id = 4, name = "liesha",  email="liesha@gmail.com", groupsList=new List<Group>{new Group{id = 1, name = "מנהלים"} , new Group{id = 2, name = "קבטים"} }}
                };
            }

            return Json(
            Session["users"] as List<User>, JsonRequestBehavior.AllowGet);
        }


        [HttpPost]
        public JsonResult CreateUser(User user)
        {
            List<User> lst = Session["users"] as List<User>;
          
            user.id = lst.Count+1;
            lst.Add(user);
           
            return Json(user);
        }




        [HttpPut]
        public JsonResult UpdateUser(int id, User user)
        {

            List<User> lst = Session["users"] as List<User>;
            User us = lst.First(u => u.id == id);
            us.name = user.name;
            us.email = user.email;
            
            return Json(user);
        }



        [HttpDelete]//delete
        public JsonResult UpdateUser(int id)
        {
            List<User> lst = Session["users"] as List<User>;
            lst.RemoveAll(u => u.id == id);
          
            return Json(new { });
        }
    }

    //for test purpues
    public class User
    {
        public int id { get; set; }
        public string name { get; set; }
        public string email { get; set; }
        public List<Group> groupsList { get; set; }
    }
    public class Group
    {
        public int id { get; set; }
        public string name { get; set; }
    }
}
