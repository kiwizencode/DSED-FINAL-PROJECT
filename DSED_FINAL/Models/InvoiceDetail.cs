using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DSED_FINAL.Models
{
    [Table("INVOICE_DETAIL")]
    public partial class InvoiceDetail
    {
        public InvoiceDetail()
        {
            QuarantineTank = new HashSet<QuarantineTank>();
        }

        [Key]
        [Column("PK_ID")]
        public int PkId { get; set; }
        [Column("INV_FK")]
        public int InvFk { get; set; }
        [Column("SPECIES_FK")]
        public int SpeciesFk { get; set; }
        [Column("QTY")]
        public int Qty { get; set; }
        [Column("LABEL")]
        [StringLength(50)]
        public string Label { get; set; }
        [Column("COST", TypeName = "smallmoney")]
        public decimal Cost { get; set; }
        [Column("POSTED")]
        public bool Posted { get; set; }
        [Column("DOA")]
        public int Doa { get; set; }
        [Column("CODE")]
        [StringLength(15)]
        public string Code { get; set; }

        [ForeignKey("InvFk")]
        [InverseProperty("InvoiceDetail")]
        public Invoice InvFkNavigation { get; set; }
        [ForeignKey("SpeciesFk")]
        [InverseProperty("InvoiceDetail")]
        public Species SpeciesFkNavigation { get; set; }
        [InverseProperty("InvDetailFkNavigation")]
        public ICollection<QuarantineTank> QuarantineTank { get; set; }
    }
}
