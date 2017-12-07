using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DSED_FINAL.Models
{
    [Table("QUARANTINE_TANK")]
    public partial class QuarantineTank
    {
        public QuarantineTank()
        {
            TankMovementDestinationFkNavigation = new HashSet<TankMovement>();
            TankMovementSourceFkNavigation = new HashSet<TankMovement>();
        }

        [Key]
        [Column("ID_PK")]
        public int IdPk { get; set; }
        [Column("TANK_FK")]
        public int TankFk { get; set; }
        [Column("INV_DETAIL_FK")]
        public int InvDetailFk { get; set; }
        [Column("PERIOD_FK")]
        public int PeriodFk { get; set; }
        [Column("QTY")]
        public int Qty { get; set; }

        [ForeignKey("InvDetailFk")]
        [InverseProperty("QuarantineTank")]
        public InvoiceDetail InvDetailFkNavigation { get; set; }
        [ForeignKey("PeriodFk")]
        [InverseProperty("QuarantineTank")]
        public QuarantinePeriod PeriodFkNavigation { get; set; }
        [ForeignKey("TankFk")]
        [InverseProperty("QuarantineTank")]
        public Tank TankFkNavigation { get; set; }
        [InverseProperty("DestinationFkNavigation")]
        public ICollection<TankMovement> TankMovementDestinationFkNavigation { get; set; }
        [InverseProperty("SourceFkNavigation")]
        public ICollection<TankMovement> TankMovementSourceFkNavigation { get; set; }
    }
}
