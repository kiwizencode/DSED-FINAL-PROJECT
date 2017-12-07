using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DSED_FINAL.Models
{
    [Table("REASON")]
    public partial class Reason
    {
        public Reason()
        {
            TankMovement = new HashSet<TankMovement>();
        }

        [Key]
        [Column("ID_PK")]
        public int IdPk { get; set; }
        [Required]
        [Column("TEXT")]
        [StringLength(100)]
        public string Text { get; set; }
        [Column("FLAG")]
        public bool Flag { get; set; }

        [InverseProperty("ReasonFkNavigation")]
        public ICollection<TankMovement> TankMovement { get; set; }
    }
}
