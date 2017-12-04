using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DSED_FINAL.Models
{
    [Table("LANE")]
    public partial class Lane
    {
        public Lane()
        {
            Tank = new HashSet<Tank>();
        }

        [Key]
        [Column("ID_PK")]
        public int IdPk { get; set; }
        [Required]
        [Column("CODE")]
        [StringLength(5)]
        public string Code { get; set; }
        [Column("TEXT")]
        [StringLength(100)]
        public string Text { get; set; }

        [InverseProperty("LaneFkNavigation")]
        public ICollection<Tank> Tank { get; set; }
    }
}
