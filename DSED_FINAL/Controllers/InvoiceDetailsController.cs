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
    //[Route("api/InvoiceDetails")]
    [Route("api/[controller]")]
    public class InvoiceDetailsController : Controller
    {
        private readonly DSEDContext _context;

        public InvoiceDetailsController(DSEDContext context)
        {
            _context = context;
        }

        // GET: api/InvoiceDetails
        [HttpGet]
        public IEnumerable<InvoiceDetail> GetInvoiceDetail()
        {
            return _context.InvoiceDetail;
        }

        // GET: api/InvoiceDetails/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetInvoiceDetail([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var invoiceDetail = await _context.InvoiceDetail.SingleOrDefaultAsync(m => m.PkId == id);

            if (invoiceDetail == null)
            {
                return NotFound();
            }

            return Ok(invoiceDetail);
        }

        // PUT: api/InvoiceDetails/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutInvoiceDetail([FromRoute] int id, [FromBody] InvoiceDetail invoiceDetail)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != invoiceDetail.PkId)
            {
                return BadRequest();
            }

            _context.Entry(invoiceDetail).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!InvoiceDetailExists(id))
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

        // POST: api/InvoiceDetails
        [HttpPost]
        public async Task<IActionResult> PostInvoiceDetail([FromBody] InvoiceDetail invoiceDetail)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.InvoiceDetail.Add(invoiceDetail);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetInvoiceDetail", new { id = invoiceDetail.PkId }, invoiceDetail);
        }

        // DELETE: api/InvoiceDetails/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteInvoiceDetail([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var invoiceDetail = await _context.InvoiceDetail.SingleOrDefaultAsync(m => m.PkId == id);
            if (invoiceDetail == null)
            {
                return NotFound();
            }

            _context.InvoiceDetail.Remove(invoiceDetail);
            await _context.SaveChangesAsync();

            return Ok(invoiceDetail);
        }

        private bool InvoiceDetailExists(int id)
        {
            return _context.InvoiceDetail.Any(e => e.PkId == id);
        }
    }
}