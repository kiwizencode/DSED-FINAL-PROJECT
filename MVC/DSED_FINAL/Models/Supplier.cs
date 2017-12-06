using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DSED_FINAL.Models
{
    [Table("SUPPLIER")]
    public partial class Supplier
    {
        public Supplier()
        {
            Invoice = new HashSet<Invoice>();
        }

        [Key]
        [Column("ID_PK")]
        public int IdPk { get; set; }
        [Required]
        [Column("NAME")]
        [StringLength(50)]
        public string Name { get; set; }
        [Column("ADDRESS01")]
        [StringLength(50)]
        public string Address01 { get; set; }
        [Column("ADDRESS02")]
        [StringLength(50)]
        public string Address02 { get; set; }
        [Column("ADDRESS03")]
        [StringLength(50)]
        public string Address03 { get; set; }
        [Column("PHONE")]
        [StringLength(50)]
        public string Phone { get; set; }
        [Column("FAX")]
        [StringLength(50)]
        public string Fax { get; set; }

        [InverseProperty("SupplierFkNavigation")]
        public ICollection<Invoice> Invoice { get; set; }
    }
}
