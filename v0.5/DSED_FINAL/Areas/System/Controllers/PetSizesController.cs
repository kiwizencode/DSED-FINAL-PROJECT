using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using DSED_FINAL.Models;

namespace DSED_FINAL.Areas.System.Controllers
{
    [Area("System")]
    public class PetSizesController : Controller
    {
        private readonly FIABContext _context;

        public PetSizesController(FIABContext context)
        {
            _context = context;
        }

        // GET: System/PetSizes
        public async Task<IActionResult> Index()
        {
            return View(await _context.RecordPetSize.ToListAsync());
        }

        // GET: System/PetSizes/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var recordPetSize = await _context.RecordPetSize
                .SingleOrDefaultAsync(m => m.IdPk == id);
            if (recordPetSize == null)
            {
                return NotFound();
            }

            return View(recordPetSize);
        }

        // GET: System/PetSizes/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: System/PetSizes/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("IdPk,Description")] RecordPetSize recordPetSize)
        {
            if (ModelState.IsValid)
            {
                _context.Add(recordPetSize);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(recordPetSize);
        }

        // GET: System/PetSizes/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var recordPetSize = await _context.RecordPetSize.SingleOrDefaultAsync(m => m.IdPk == id);
            if (recordPetSize == null)
            {
                return NotFound();
            }
            return View(recordPetSize);
        }

        // POST: System/PetSizes/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("IdPk,Description")] RecordPetSize recordPetSize)
        {
            if (id != recordPetSize.IdPk)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(recordPetSize);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!RecordPetSizeExists(recordPetSize.IdPk))
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
            return View(recordPetSize);
        }

        // GET: System/PetSizes/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var recordPetSize = await _context.RecordPetSize
                .SingleOrDefaultAsync(m => m.IdPk == id);
            if (recordPetSize == null)
            {
                return NotFound();
            }

            return View(recordPetSize);
        }

        // POST: System/PetSizes/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var recordPetSize = await _context.RecordPetSize.SingleOrDefaultAsync(m => m.IdPk == id);
            _context.RecordPetSize.Remove(recordPetSize);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool RecordPetSizeExists(int id)
        {
            return _context.RecordPetSize.Any(e => e.IdPk == id);
        }
    }
}
