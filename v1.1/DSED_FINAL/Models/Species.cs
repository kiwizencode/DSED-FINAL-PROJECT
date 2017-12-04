using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DSED_FINAL.Models
{
    [Table("SPECIES")]
    public partial class Species
    {
        [Key]
        [Column("ID_PK")]
        public int IdPk { get; set; }
        [Required]
        [Column("SCIENTIFIC")]
        [StringLength(40)]
        public string Scientific { get; set; }
        [Required]
        [Column("COMMON")]
        [StringLength(80)]
        public string Common { get; set; }
    }
}
