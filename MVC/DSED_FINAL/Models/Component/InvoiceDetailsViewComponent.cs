using System;
using System.Collections.Generic;
using System.Linq;

using System.Threading.Tasks;

using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DSED_FINAL.Models.Component
{
    [ViewComponent(Name="InvoiceDetails")]
    public class InvoiceDetailsViewComponent : ViewComponent
    {
        private readonly DSEDContext _context;

        public InvoiceDetailsViewComponent(DSEDContext context)
        {
            _context = context;
        }

        public async Task<IViewComponentResult> InvokeAsync(int invID)
        {
            var items = await GetInvoiceDetail(invID);
            return View(items);
        }

        private Task<List<InvoiceDetail>> GetInvoiceDetail(int invID)
        {
            var dSEDContext = _context.InvoiceDetail.Where(i => i.InvFk==invID).Include(i => i.InvFkNavigation).Include(i => i.SpeciesFkNavigation);
            return dSEDContext.ToListAsync();
        }
    }
}
