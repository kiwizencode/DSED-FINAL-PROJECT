using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace DSED_FINAL.Models
{
    public partial class FIABContext : DbContext
    {
        public FIABContext(DbContextOptions<FIABContext> opts) : base(opts) { }

        public virtual DbSet<MarineClass> MarineClass { get; set; }
        public virtual DbSet<MarineFamily> MarineFamily { get; set; }
        public virtual DbSet<MarineSpecies> MarineSpecies { get; set; }
        public virtual DbSet<Movement> Movement { get; set; }
        public virtual DbSet<MovementBatch> MovementBatch { get; set; }
        public virtual DbSet<MovementPeriod> MovementPeriod { get; set; }
        public virtual DbSet<ReasonMortality> ReasonMortality { get; set; }
        public virtual DbSet<RecordGroup> RecordGroup { get; set; }
        public virtual DbSet<RecordPacking> RecordPacking { get; set; }
        public virtual DbSet<RecordPet> RecordPet { get; set; }
        public virtual DbSet<RecordPetSize> RecordPetSize { get; set; }
        public virtual DbSet<Shipment> Shipment { get; set; }
        public virtual DbSet<ShipmentItem> ShipmentItem { get; set; }
        public virtual DbSet<ShipmentOrder> ShipmentOrder { get; set; }
        public virtual DbSet<SysStuff> SysStuff { get; set; }
        public virtual DbSet<Tank> Tank { get; set; }
        public virtual DbSet<TankBay> TankBay { get; set; }
        public virtual DbSet<TankLog> TankLog { get; set; }
        public virtual DbSet<TankLogDaily> TankLogDaily { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<MarineSpecies>(entity =>
            {
                entity.HasOne(d => d.ClassFkNavigation)
                    .WithMany(p => p.MarineSpecies)
                    .HasForeignKey(d => d.ClassFk)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_MARINE_SPECIES_MARINE_CLASS");

                entity.HasOne(d => d.FamilyFkNavigation)
                    .WithMany(p => p.MarineSpecies)
                    .HasForeignKey(d => d.FamilyFk)
                    .HasConstraintName("FK_MARINE_SPECIES_MARINE_FAMILY");
            });

            modelBuilder.Entity<Movement>(entity =>
            {
                entity.Property(e => e.Timestamp).HasDefaultValueSql("(getdate())");
            });

            modelBuilder.Entity<MovementPeriod>(entity =>
            {
                entity.Property(e => e.StartDate).HasDefaultValueSql("(getdate())");
            });

            modelBuilder.Entity<RecordPet>(entity =>
            {
                entity.HasOne(d => d.GroupFkNavigation)
                    .WithMany(p => p.RecordPet)
                    .HasForeignKey(d => d.GroupFk)
                    .HasConstraintName("FK_RECORD_PET_RECORD_GROUP");

                entity.HasOne(d => d.SizeFkNavigation)
                    .WithMany(p => p.RecordPet)
                    .HasForeignKey(d => d.SizeFk)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_RECORD_PET_RECORD_PET_SIZE");

                entity.HasOne(d => d.SpeciesFkNavigation)
                    .WithMany(p => p.RecordPet)
                    .HasForeignKey(d => d.SpeciesFk)
                    .HasConstraintName("FK_RECORD_PET_MARINE_SPECIES");
            });

            modelBuilder.Entity<ShipmentItem>(entity =>
            {
                entity.HasOne(d => d.RecordFkNavigation)
                    .WithMany(p => p.ShipmentItem)
                    .HasForeignKey(d => d.RecordFk)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_SHIPMENT_ITEM_SHIPMENT_ORDER");

                entity.HasOne(d => d.SizeFkNavigation)
                    .WithMany(p => p.ShipmentItem)
                    .HasForeignKey(d => d.SizeFk)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_SHIPMENT_ITEM_RECORD_PET_SIZE");

                entity.HasOne(d => d.SpeciesFkNavigation)
                    .WithMany(p => p.ShipmentItem)
                    .HasForeignKey(d => d.SpeciesFk)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_SHIPMENT_ITEM_MARINE_SPECIES");
            });

            modelBuilder.Entity<ShipmentOrder>(entity =>
            {
                entity.HasOne(d => d.ShipmentFkNavigation)
                    .WithMany(p => p.ShipmentOrder)
                    .HasForeignKey(d => d.ShipmentFk)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_SHIPMENT_ORDER_SHIPMENT");
            });

            modelBuilder.Entity<Tank>(entity =>
            {
                entity.HasOne(d => d.BayFkNavigation)
                    .WithMany(p => p.Tank)
                    .HasForeignKey(d => d.BayFk)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_TANK_TANK_BAY");
            });

            modelBuilder.Entity<TankLog>(entity =>
            {
                entity.Property(e => e.SpeciesText2).HasDefaultValueSql("('VARIANT/MALE/FEMALE')");

                entity.HasOne(d => d.PeriodFkNavigation)
                    .WithMany(p => p.TankLog)
                    .HasForeignKey(d => d.PeriodFk)
                    .HasConstraintName("FK_TANK_LOG_MOVEMENT_PERIOD");

                entity.HasOne(d => d.SizeFkNavigation)
                    .WithMany(p => p.TankLog)
                    .HasForeignKey(d => d.SizeFk)
                    .HasConstraintName("FK_TANK_LOG_RECORD_PET_SIZE");

                entity.HasOne(d => d.SpeciesFkNavigation)
                    .WithMany(p => p.TankLog)
                    .HasForeignKey(d => d.SpeciesFk)
                    .HasConstraintName("FK_TANK_LOG_MARINE_SPECIES");

                entity.HasOne(d => d.StuffFkNavigation)
                    .WithMany(p => p.TankLog)
                    .HasForeignKey(d => d.StuffFk)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_TANK_LOG_SYS_STUFF");

                entity.HasOne(d => d.TankFkNavigation)
                    .WithMany(p => p.TankLog)
                    .HasForeignKey(d => d.TankFk)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_TANK_LOG_TANK");
            });

            modelBuilder.Entity<TankLogDaily>(entity =>
            {
                entity.Property(e => e.LogDate).HasDefaultValueSql("(getdate())");

                entity.HasOne(d => d.LogFkNavigation)
                    .WithMany(p => p.TankLogDaily)
                    .HasForeignKey(d => d.LogFk)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_TANK_LOG_DAILY_TANK_LOG");

                entity.HasOne(d => d.ReasonFkNavigation)
                    .WithMany(p => p.TankLogDaily)
                    .HasForeignKey(d => d.ReasonFk)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_TANK_LOG_DAILY_REASON_MORTALITY");

                entity.HasOne(d => d.StuffFkNavigation)
                    .WithMany(p => p.TankLogDaily)
                    .HasForeignKey(d => d.StuffFk)
                    .HasConstraintName("FK_TANK_LOG_DAILY_SYS_STUFF");
            });
        }
    }
}
