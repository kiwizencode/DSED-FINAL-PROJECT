using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace DSED_FINAL.Areas.Main.Controllers
{
    [Area("Main")]
    public class HomeController : Controller
    {
        // GET: /Main/Home/Index
        public IActionResult Index()
        {
            return View();
        }
    }
}