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
    public class PetSizesController : Controller
    {
        private readonly DSEDContext _context;

        public PetSizesController(DSEDContext context)
        {
            _context = context;
        }

        // GET: PetSizes
        public async Task<IActionResult> Index()
        {
            return View(await _context.PetSize.ToListAsync());
        }

        // GET: PetSizes/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var petSize = await _context.PetSize
                .SingleOrDefaultAsync(m => m.IdPk == id);
            if (petSize == null)
            {
                return NotFound();
            }

            return View(petSize);
        }

        // GET: PetSizes/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: PetSizes/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("IdPk,Description")] PetSize petSize)
        {
            if (ModelState.IsValid)
            {
                _context.Add(petSize);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(petSize);
        }

        // GET: PetSizes/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var petSize = await _context.PetSize.SingleOrDefaultAsync(m => m.IdPk == id);
            if (petSize == null)
            {
                return NotFound();
            }
            return View(petSize);
        }

        // POST: PetSizes/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("IdPk,Description")] PetSize petSize)
        {
            if (id != petSize.IdPk)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(petSize);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!PetSizeExists(petSize.IdPk))
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
            return View(petSize);
        }

        // GET: PetSizes/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var petSize = await _context.PetSize
                .SingleOrDefaultAsync(m => m.IdPk == id);
            if (petSize == null)
            {
                return NotFound();
            }

            return View(petSize);
        }

        // POST: PetSizes/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var petSize = await _context.PetSize.SingleOrDefaultAsync(m => m.IdPk == id);
            _context.PetSize.Remove(petSize);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool PetSizeExists(int id)
        {
            return _context.PetSize.Any(e => e.IdPk == id);
        }
    }
}
