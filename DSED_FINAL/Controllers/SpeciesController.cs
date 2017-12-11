using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DSED_FINAL.Models;

namespace DSED_FINAL.Controllers.System
{
    [Produces("application/json")]
    //[Route("api/Species")]
    [Route("api/[controller]")]
    public class SpeciesController : Controller
    {
        private readonly DSEDContext _context;

        public SpeciesController(DSEDContext context)
        {
            _context = context;
        }

        // GET: api/Species
        [HttpGet]
        public IEnumerable<Species> GetSpecies()
        {
            return _context.Species;
        }

        // GET: api/Species/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetSpecies([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var species = await _context.Species.SingleOrDefaultAsync(m => m.IdPk == id);

            if (species == null)
            {
                return NotFound();
            }

            return Ok(species);
        }

        // PUT: api/Species/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSpecies([FromRoute] int id, [FromBody] Species species)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != species.IdPk)
            {
                return BadRequest();
            }

            _context.Entry(species).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SpeciesExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Species
        [HttpPost]
        public async Task<IActionResult> PostSpecies([FromBody] Species species)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Species.Add(species);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSpecies", new { id = species.IdPk }, species);
        }

        // DELETE: api/Species/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSpecies([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var species = await _context.Species.SingleOrDefaultAsync(m => m.IdPk == id);
            if (species == null)
            {
                return NotFound();
            }

            _context.Species.Remove(species);
            await _context.SaveChangesAsync();

            return Ok(species);
        }

        private bool SpeciesExists(int id)
        {
            return _context.Species.Any(e => e.IdPk == id);
        }
    }
}