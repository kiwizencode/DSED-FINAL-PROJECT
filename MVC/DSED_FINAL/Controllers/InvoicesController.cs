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
    public class InvoicesController : Controller
    {
        private readonly DSEDContext _context;

        public InvoicesController(DSEDContext context)
        {
            _context = context;
        }

        // GET: Invoices
        public async Task<IActionResult> Index()
        {
            var dSEDContext = _context.Invoice.Include(i => i.SupplierFkNavigation);
            return View(await dSEDContext.ToListAsync());
        }


        // GET: Invoices
        //public async Task<IActionResult> Index(int? page)
        //{
        //    var dSEDContext = _context.Invoice.Include(i => i.SupplierFkNavigation);
        //    int pageNumber = page ?? 1;
        //    int pageSize = 3;
        //    //return View(await dSEDContext.ToListAsync());
        //    //return PartialView(await dSEDContext.ToPageList(pageNumber, pageSize));
        //}

        // GET: Invoices/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var invoice = await _context.Invoice
                .Include(i => i.SupplierFkNavigation)
                .SingleOrDefaultAsync(m => m.IdPk == id);
            if (invoice == null)
            {
                return NotFound();
            }

            return View(invoice);
        }

        // GET: Invoices/Create
        public IActionResult Create()
        {
            ViewData["SupplierFk"] = new SelectList(_context.Supplier, "IdPk", "Name");
            return View();
        }

        // POST: Invoices/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("IdPk,Date,Doa,FlightNo,Total,SupplierFk")] Invoice invoice)
        {
            if (ModelState.IsValid)
            {
                _context.Add(invoice);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            ViewData["SupplierFk"] = new SelectList(_context.Supplier, "IdPk", "Name", invoice.SupplierFk);
            return View(invoice);
        }

        // GET: Invoices/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var invoice = await _context.Invoice.SingleOrDefaultAsync(m => m.IdPk == id);
            if (invoice == null)
            {
                return NotFound();
            }
            ViewData["SupplierFk"] = new SelectList(_context.Supplier, "IdPk", "Name", invoice.SupplierFk);
            return View(invoice);
        }

        // POST: Invoices/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("IdPk,Date,Doa,FlightNo,Total,SupplierFk")] Invoice invoice)
        {
            if (id != invoice.IdPk)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(invoice);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!InvoiceExists(invoice.IdPk))
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
            ViewData["SupplierFk"] = new SelectList(_context.Supplier, "IdPk", "Name", invoice.SupplierFk);
            return View(invoice);
        }

        // GET: Invoices/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var invoice = await _context.Invoice
                .Include(i => i.SupplierFkNavigation)
                .SingleOrDefaultAsync(m => m.IdPk == id);
            if (invoice == null)
            {
                return NotFound();
            }

            return View(invoice);
        }

        // POST: Invoices/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var invoice = await _context.Invoice.SingleOrDefaultAsync(m => m.IdPk == id);
            _context.Invoice.Remove(invoice);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool InvoiceExists(int id)
        {
            return _context.Invoice.Any(e => e.IdPk == id);
        }
    }
}
