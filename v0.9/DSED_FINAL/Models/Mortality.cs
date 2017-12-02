using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DSED_FINAL.Models
{
    [Table("MORTALITY")]
    public partial class Mortality
    {
        public Mortality()
        {
            DailyLog = new HashSet<DailyLog>();
        }

        [Key]
        [Column("ID_PK")]
        public int IdPk { get; set; }
        [Required]
        [Column("TEXT")]
        [StringLength(100)]
        public string Text { get; set; }

        [InverseProperty("ReasonFkNavigation")]
        public ICollection<DailyLog> DailyLog { get; set; }
    }
}
