using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DSED_FINAL.Models
{
    [Table("TANK_LOG")]
    public partial class TankLog
    {
        public TankLog()
        {
            DailyLog = new HashSet<DailyLog>();
        }

        [Key]
        [Column("ID_PK")]
        public int IdPk { get; set; }
        [Column("COMMENT")]
        [StringLength(100)]
        public string Comment { get; set; }
        [Column("PERIOD_DATE", TypeName = "datetime")]
        public DateTime PeriodDate { get; set; }
        [Column("QTY")]
        public int Qty { get; set; }
        [Column("SPECIES_FK")]
        public int SpeciesFk { get; set; }
        [Column("TANK_ID")]
        public int TankId { get; set; }

        [ForeignKey("SpeciesFk")]
        [InverseProperty("TankLog")]
        public Species SpeciesFkNavigation { get; set; }
        [InverseProperty("LogFkNavigation")]
        public ICollection<DailyLog> DailyLog { get; set; }
    }
}
