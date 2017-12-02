using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DSED_FINAL.Models
{
    [Table("SYSTEM_TABLE")]
    public partial class SystemTable
    {
        [Key]
        [Column("ID_PK")]
        public int IdPk { get; set; }
        [Required]
        [Column("VALUE")]
        [StringLength(5)]
        public string Value { get; set; }
        [Column("TEXT")]
        [StringLength(30)]
        public string Text { get; set; }
        [Column("GROUP_FK")]
        public int? GroupFk { get; set; }
        [Column("DELETED")]
        public bool Deleted { get; set; }
    }
}
