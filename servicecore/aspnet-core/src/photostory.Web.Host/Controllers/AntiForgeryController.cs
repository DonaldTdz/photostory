using Microsoft.AspNetCore.Antiforgery;
using photostory.Controllers;

namespace photostory.Web.Host.Controllers
{
    public class AntiForgeryController : photostoryControllerBase
    {
        private readonly IAntiforgery _antiforgery;

        public AntiForgeryController(IAntiforgery antiforgery)
        {
            _antiforgery = antiforgery;
        }

        public void GetToken()
        {
            _antiforgery.SetCookieTokenAndHeader(HttpContext);
        }
    }
}
