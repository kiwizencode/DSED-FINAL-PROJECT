using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;

using DSED_FINAL.Models;

namespace DSED_FINAL.Controllers
{
    public class ComponentsController : Controller
    {
        public IActionResult Index()
        {
            //return View();
            return Content("Use /InvoiceDetails");
        }
    }
}