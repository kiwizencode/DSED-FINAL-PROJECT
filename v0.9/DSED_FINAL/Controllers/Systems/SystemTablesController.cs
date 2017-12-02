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
    //[Route("api/SystemTables")]
    [Route("api/[controller]")]
    public class SystemTablesController : Controller
    {
        private readonly AIMSContext _context;

        public SystemTablesController(AIMSContext context)
        {
            _context = context;
        }

        // GET: api/SystemTables/GetTables
        //[HttpGet]
        [HttpGet("[action]")]
        public IEnumerable<SystemTable> GetTables()
        {
            return _context.SystemTable;
        }

        // GET: api/SystemTables/5
        //[HttpGet("{id}")]
        [HttpGet("[action]/{id}")]
        public async Task<IActionResult> GetSystemTable([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var systemTable = await _context.SystemTable.SingleOrDefaultAsync(m => m.IdPk == id);

            if (systemTable == null)
            {
                return NotFound();
            }

            return Ok(systemTable);
        }

        // PUT: api/SystemTables/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSystemTable([FromRoute] int id, [FromBody] SystemTable systemTable)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != systemTable.IdPk)
            {
                return BadRequest();
            }

            _context.Entry(systemTable).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SystemTableExists(id))
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

        // POST: api/SystemTables
        [HttpPost]
        public async Task<IActionResult> PostSystemTable([FromBody] SystemTable systemTable)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.SystemTable.Add(systemTable);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSystemTable", new { id = systemTable.IdPk }, systemTable);
        }

        // DELETE: api/SystemTables/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSystemTable([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var systemTable = await _context.SystemTable.SingleOrDefaultAsync(m => m.IdPk == id);
            if (systemTable == null)
            {
                return NotFound();
            }

            _context.SystemTable.Remove(systemTable);
            await _context.SaveChangesAsync();

            return Ok(systemTable);
        }

        private bool SystemTableExists(int id)
        {
            return _context.SystemTable.Any(e => e.IdPk == id);
        }
    }
}