using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DSED_FINAL.Models;

namespace DSED_FINAL.Controllers
{
    [Produces("application/json")]
    //[Route("api/QuarantinePeriods")]
    [Route("api/[controller]")]
    public class QuarantinePeriodsController : Controller
    {
        private readonly DSEDContext _context;

        public QuarantinePeriodsController(DSEDContext context)
        {
            _context = context;
        }

        // GET: api/QuarantinePeriods
        [HttpGet]
        public IEnumerable<QuarantinePeriod> GetQuarantinePeriod()
        {
            return _context.QuarantinePeriod;
        }

        // GET: api/QuarantinePeriods/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetQuarantinePeriod([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var quarantinePeriod = await _context.QuarantinePeriod.SingleOrDefaultAsync(m => m.IdPk == id);

            if (quarantinePeriod == null)
            {
                return NotFound();
            }

            return Ok(quarantinePeriod);
        }

        // PUT: api/QuarantinePeriods/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutQuarantinePeriod([FromRoute] int id, [FromBody] QuarantinePeriod quarantinePeriod)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != quarantinePeriod.IdPk)
            {
                return BadRequest();
            }

            _context.Entry(quarantinePeriod).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!QuarantinePeriodExists(id))
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

        // POST: api/QuarantinePeriods
        [HttpPost]
        public async Task<IActionResult> PostQuarantinePeriod([FromBody] QuarantinePeriod quarantinePeriod)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.QuarantinePeriod.Add(quarantinePeriod);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetQuarantinePeriod", new { id = quarantinePeriod.IdPk }, quarantinePeriod);
        }

        // DELETE: api/QuarantinePeriods/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteQuarantinePeriod([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var quarantinePeriod = await _context.QuarantinePeriod.SingleOrDefaultAsync(m => m.IdPk == id);
            if (quarantinePeriod == null)
            {
                return NotFound();
            }

            _context.QuarantinePeriod.Remove(quarantinePeriod);
            await _context.SaveChangesAsync();

            return Ok(quarantinePeriod);
        }

        private bool QuarantinePeriodExists(int id)
        {
            return _context.QuarantinePeriod.Any(e => e.IdPk == id);
        }
    }
}