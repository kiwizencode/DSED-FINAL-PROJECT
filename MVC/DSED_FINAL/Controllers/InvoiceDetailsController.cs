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
    public class InvoiceDetailsController : Controller
    {
        private readonly DSEDContext _context;

        public InvoiceDetailsController(DSEDContext context)
        {
            _context = context;
        }

        // GET: InvoiceDetails
        public async Task<IActionResult> Index()
        {
            var dSEDContext = _context.InvoiceDetail.Include(i => i.InvFkNavigation).Include(i => i.SpeciesFkNavigation);
            return View(await dSEDContext.ToListAsync());
        }

        // GET: InvoiceDetails/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var invoiceDetail = await _context.InvoiceDetail
                .Include(i => i.InvFkNavigation)
                .Include(i => i.SpeciesFkNavigation)
                .SingleOrDefaultAsync(m => m.PkId == id);
            if (invoiceDetail == null)
            {
                return NotFound();
            }

            return View(invoiceDetail);
        }

        // GET: InvoiceDetails/Create
        public IActionResult Create()
        {
            ViewData["InvFk"] = new SelectList(_context.Invoice, "IdPk", "FlightNo");
            ViewData["SpeciesFk"] = new SelectList(_context.Species, "IdPk", "Common");
            return View();
        }

        // POST: InvoiceDetails/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("PkId,InvFk,SpeciesFk,Qty,Label,Cost,Posted,Doa,Code")] InvoiceDetail invoiceDetail)
        {
            if (ModelState.IsValid)
            {
                _context.Add(invoiceDetail);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            ViewData["InvFk"] = new SelectList(_context.Invoice, "IdPk", "FlightNo", invoiceDetail.InvFk);
            ViewData["SpeciesFk"] = new SelectList(_context.Species, "IdPk", "Common", invoiceDetail.SpeciesFk);
            return View(invoiceDetail);
        }

        // GET: InvoiceDetails/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var invoiceDetail = await _context.InvoiceDetail.SingleOrDefaultAsync(m => m.PkId == id);
            if (invoiceDetail == null)
            {
                return NotFound();
            }
            ViewData["InvFk"] = new SelectList(_context.Invoice, "IdPk", "FlightNo", invoiceDetail.InvFk);
            ViewData["SpeciesFk"] = new SelectList(_context.Species, "IdPk", "Common", invoiceDetail.SpeciesFk);
            return View(invoiceDetail);
        }

        // POST: InvoiceDetails/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("PkId,InvFk,SpeciesFk,Qty,Label,Cost,Posted,Doa,Code")] InvoiceDetail invoiceDetail)
        {
            if (id != invoiceDetail.PkId)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(invoiceDetail);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!InvoiceDetailExists(invoiceDetail.PkId))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction(nameof(Index));
            }
            ViewData["InvFk"] = new SelectList(_context.Invoice, "IdPk", "FlightNo", invoiceDetail.InvFk);
            ViewData["SpeciesFk"] = new SelectList(_context.Species, "IdPk", "Common", invoiceDetail.SpeciesFk);
            return View(invoiceDetail);
        }

        // GET: InvoiceDetails/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var invoiceDetail = await _context.InvoiceDetail
                .Include(i => i.InvFkNavigation)
                .Include(i => i.SpeciesFkNavigation)
                .SingleOrDefaultAsync(m => m.PkId == id);
            if (invoiceDetail == null)
            {
                return NotFound();
            }

            return View(invoiceDetail);
        }

        // POST: InvoiceDetails/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var invoiceDetail = await _context.InvoiceDetail.SingleOrDefaultAsync(m => m.PkId == id);
            _context.InvoiceDetail.Remove(invoiceDetail);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool InvoiceDetailExists(int id)
        {
            return _context.InvoiceDetail.Any(e => e.PkId == id);
        }
    }
}
