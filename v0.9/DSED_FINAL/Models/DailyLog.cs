using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DSED_FINAL.Models
{
    [Table("DAILY_LOG")]
    public partial class DailyLog
    {
        [Key]
        [Column("ID_PK")]
        public int IdPk { get; set; }
        [Column("COMMENT")]
        [StringLength(100)]
        public string Comment { get; set; }
        [Column("DAILY_DATE", TypeName = "datetime")]
        public DateTime DailyDate { get; set; }
        [Column("LOG_FK")]
        public int LogFk { get; set; }
        [Column("QTY")]
        public int Qty { get; set; }
        [Column("REASON_FK")]
        public int ReasonFk { get; set; }

        [ForeignKey("LogFk")]
        [InverseProperty("DailyLog")]
        public TankLog LogFkNavigation { get; set; }
        [ForeignKey("ReasonFk")]
        [InverseProperty("DailyLog")]
        public Mortality ReasonFkNavigation { get; set; }
    }
}
