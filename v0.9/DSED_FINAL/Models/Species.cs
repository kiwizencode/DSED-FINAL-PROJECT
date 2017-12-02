using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DSED_FINAL.Models
{
    [Table("SPECIES")]
    public partial class Species
    {
        public Species()
        {
            TankLog = new HashSet<TankLog>();
        }

        [Key]
        [Column("ID_PK")]
        public int IdPk { get; set; }
        [Required]
        [Column("COMMON")]
        [StringLength(100)]
        public string Common { get; set; }
        [Required]
        [Column("SCIENTIFIC")]
        [StringLength(50)]
        public string Scientific { get; set; }

        [InverseProperty("SpeciesFkNavigation")]
        public ICollection<TankLog> TankLog { get; set; }
    }
}
