using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DSED_FINAL.Models
{
    [Table("INVOICE")]
    public partial class Invoice
    {
        public Invoice()
        {
            InvoiceDetail = new HashSet<InvoiceDetail>();
        }

        [Key]
        [Column("ID_PK")]
        public int IdPk { get; set; }
        [Column("DATE", TypeName = "date")]
        public DateTime Date { get; set; }
        [Column("DOA", TypeName = "date")]
        public DateTime? Doa { get; set; }
        [Required]
        [Column("FLIGHT_NO")]
        [StringLength(50)]
        public string FlightNo { get; set; }
        [Column("TOTAL")]
        public int Total { get; set; }
        [Column("SUPPLIER_FK")]
        public int SupplierFk { get; set; }

        [ForeignKey("SupplierFk")]
        [InverseProperty("Invoice")]
        public Supplier SupplierFkNavigation { get; set; }
        [InverseProperty("InvFkNavigation")]
        public ICollection<InvoiceDetail> InvoiceDetail { get; set; }
    }
}
