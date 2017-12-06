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
    public class QuarantinePeriodsController : Controller
    {
        private readonly DSEDContext _context;

        public QuarantinePeriodsController(DSEDContext context)
        {
            _context = context;
        }

        // GET: QuarantinePeriods
        public async Task<IActionResult> Index()
        {
            return View(await _context.QuarantinePeriod.ToListAsync());
        }

        // GET: QuarantinePeriods/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var quarantinePeriod = await _context.QuarantinePeriod
                .SingleOrDefaultAsync(m => m.IdPk == id);
            if (quarantinePeriod == null)
            {
                return NotFound();
            }

            return View(quarantinePeriod);
        }

        // GET: QuarantinePeriods/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: QuarantinePeriods/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("IdPk,StartDate,Text,ClosedDate,ClosedFlag")] QuarantinePeriod quarantinePeriod)
        {
            if (ModelState.IsValid)
            {
                _context.Add(quarantinePeriod);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(quarantinePeriod);
        }

        // GET: QuarantinePeriods/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var quarantinePeriod = await _context.QuarantinePeriod.SingleOrDefaultAsync(m => m.IdPk == id);
            if (quarantinePeriod == null)
            {
                return NotFound();
            }
            return View(quarantinePeriod);
        }

        // POST: QuarantinePeriods/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("IdPk,StartDate,Text,ClosedDate,ClosedFlag")] QuarantinePeriod quarantinePeriod)
        {
            if (id != quarantinePeriod.IdPk)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(quarantinePeriod);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!QuarantinePeriodExists(quarantinePeriod.IdPk))
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
            return View(quarantinePeriod);
        }

        // GET: QuarantinePeriods/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var quarantinePeriod = await _context.QuarantinePeriod
                .SingleOrDefaultAsync(m => m.IdPk == id);
            if (quarantinePeriod == null)
            {
                return NotFound();
            }

            return View(quarantinePeriod);
        }

        // POST: QuarantinePeriods/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var quarantinePeriod = await _context.QuarantinePeriod.SingleOrDefaultAsync(m => m.IdPk == id);
            _context.QuarantinePeriod.Remove(quarantinePeriod);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool QuarantinePeriodExists(int id)
        {
            return _context.QuarantinePeriod.Any(e => e.IdPk == id);
        }
    }
}
