using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System.Diagnostics;

namespace MovieKeep.WebSPA.Controllers
{
    public class HomeController : Controller
    {
        private readonly IHostingEnvironment environment;
        private readonly IOptionsSnapshot<AppSettings> settings;

        public HomeController(IHostingEnvironment environment, IOptionsSnapshot<AppSettings> settings)
        {
            this.environment = environment;
            this.settings = settings;
        }

        public IActionResult Configuration()
        {
            return Json(settings.Value);
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Error()
        {
            ViewData["RequestId"] = Activity.Current?.Id ?? HttpContext.TraceIdentifier;
            return View();
        }
    }
}
