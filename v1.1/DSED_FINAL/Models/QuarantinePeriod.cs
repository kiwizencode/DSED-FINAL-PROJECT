using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DSED_FINAL.Models
{
    [Table("QUARANTINE_PERIOD")]
    public partial class QuarantinePeriod
    {
        [Key]
        [Column("ID_PK")]
        public int IdPk { get; set; }
        [Column("START_DATE", TypeName = "date")]
        public DateTime StartDate { get; set; }
        [Column("TEXT")]
        [StringLength(100)]
        public string Text { get; set; }
        [Column("CLOSED_DATE", TypeName = "date")]
        public DateTime? ClosedDate { get; set; }
        [Column("CLOSED_FLAG")]
        public bool ClosedFlag { get; set; }
    }
}
