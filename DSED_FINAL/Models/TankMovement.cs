using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DSED_FINAL.Models
{
    [Table("TANK_MOVEMENT")]
    public partial class TankMovement
    {
        [Key]
        [Column("ID_PK")]
        public int IdPk { get; set; }
        [Column("SOURCE_FK")]
        public int SourceFk { get; set; }
        [Column("DESTINATION_FK")]
        public int DestinationFk { get; set; }
        [Column("QTY")]
        public int Qty { get; set; }
        [Column("REASON_FK")]
        public int ReasonFk { get; set; }

        [ForeignKey("DestinationFk")]
        [InverseProperty("TankMovementDestinationFkNavigation")]
        public QuarantineTank DestinationFkNavigation { get; set; }
        [ForeignKey("ReasonFk")]
        [InverseProperty("TankMovement")]
        public Reason ReasonFkNavigation { get; set; }
        [ForeignKey("SourceFk")]
        [InverseProperty("TankMovementSourceFkNavigation")]
        public QuarantineTank SourceFkNavigation { get; set; }
    }
}
