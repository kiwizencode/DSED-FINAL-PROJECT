using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DSED_FINAL.Models
{
    [Table("TANK")]
    public partial class Tank
    {
        public Tank()
        {
            QuarantineTank = new HashSet<QuarantineTank>();
        }

        [Key]
        [Column("ID_PK")]
        public int IdPk { get; set; }
        [Required]
        [Column("CODE")]
        [StringLength(10)]
        public string Code { get; set; }

        [InverseProperty("TankFkNavigation")]
        public ICollection<QuarantineTank> QuarantineTank { get; set; }
    }
}
