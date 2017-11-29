using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DSED_FINAL.Models;

namespace DSED_FINAL.Controllers.Systems
{
    //[Produces("application/json")]
    //[Route("api/MarineSizes")]
    [Route("api/[controller]")]
    public class MarineSizesController : Controller
    {
        private readonly FIABContext _context;

        public MarineSizesController(FIABContext context)
        {
            _context = context;
        }

        // GET: api/MarineSizes
        //[HttpGet]
        [HttpGet("[action]")]
        public IEnumerable<RecordPetSize> GetSizes()
        {
            return _context.RecordPetSize;
        }

        // GET: api/MarineSizes/5
        //[HttpGet("{id}")]
        [HttpGet("[action]/{id}")]
        public async Task<IActionResult> GetDefinedSize([FromRoute] int id)
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

        // PUT: api/MarineSizes/5
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

        // POST: api/MarineSizes
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

        // DELETE: api/MarineSizes/5
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