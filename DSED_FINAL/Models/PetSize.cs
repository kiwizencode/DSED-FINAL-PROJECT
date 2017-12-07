using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DSED_FINAL.Models
{
    [Table("PET_SIZE")]
    public partial class PetSize
    {
        [Key]
        [Column("ID_PK")]
        public int IdPk { get; set; }
        [Required]
        [Column("DESCRIPTION")]
        [StringLength(50)]
        public string Description { get; set; }
    }
}
