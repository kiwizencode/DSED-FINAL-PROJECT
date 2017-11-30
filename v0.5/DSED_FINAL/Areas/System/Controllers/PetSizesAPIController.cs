using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DSED_FINAL.Models;

namespace DSED_FINAL.Areas.System.Controllers
{
    [Produces("application/json")]
    [Route("api/PetSizes")]
    public class PetSizesAPIController : Controller
    {
        private readonly FIABContext _context;

        public PetSizesAPIController(FIABContext context)
        {
            _context = context;
        }

        // GET: api/PetSizes
        [HttpGet]
        public IEnumerable<RecordPetSize> GetRecordPetSize()
        {
            return _context.RecordPetSize;
        }

        // GET: api/PetSizes/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetRecordPetSize([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var recordPetSize = await _context.RecordPetSize.SingleOrDefaultAsync(m => m.IdPk == id);

            if (recordPetSize == null)
            {
                return NotFound();
            }

            return Ok(recordPetSize);
        }

        // PUT: api/PetSizes/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRecordPetSize([FromRoute] int id, [FromBody] RecordPetSize recordPetSize)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != recordPetSize.IdPk)
            {
                return BadRequest();
            }

            _context.Entry(recordPetSize).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RecordPetSizeExists(id))
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

        // POST: api/PetSizes
        [HttpPost]
        public async Task<IActionResult> PostRecordPetSize([FromBody] RecordPetSize recordPetSize)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.RecordPetSize.Add(recordPetSize);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetRecordPetSize", new { id = recordPetSize.IdPk }, recordPetSize);
        }

        // DELETE: api/PetSizes/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRecordPetSize([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var recordPetSize = await _context.RecordPetSize.SingleOrDefaultAsync(m => m.IdPk == id);
            if (recordPetSize == null)
            {
                return NotFound();
            }

            _context.RecordPetSize.Remove(recordPetSize);
            await _context.SaveChangesAsync();

            return Ok(recordPetSize);
        }

        private bool RecordPetSizeExists(int id)
        {
            return _context.RecordPetSize.Any(e => e.IdPk == id);
        }
    }
}