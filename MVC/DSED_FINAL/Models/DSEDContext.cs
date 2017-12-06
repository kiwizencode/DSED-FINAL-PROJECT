using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace DSED_FINAL.Models
{
    public partial class DSEDContext : DbContext
    {
        public DSEDContext(DbContextOptions<DSEDContext> opts) : base(opts) { }

        public virtual DbSet<Invoice> Invoice { get; set; }
        public virtual DbSet<InvoiceDetail> InvoiceDetail { get; set; }
        public virtual DbSet<PetSize> PetSize { get; set; }
        public virtual DbSet<QuarantinePeriod> QuarantinePeriod { get; set; }
        public virtual DbSet<QuarantineTank> QuarantineTank { get; set; }
        public virtual DbSet<Reason> Reason { get; set; }
        public virtual DbSet<Species> Species { get; set; }
        public virtual DbSet<Supplier> Supplier { get; set; }
        public virtual DbSet<Tank> Tank { get; set; }
        public virtual DbSet<TankMovement> TankMovement { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Invoice>(entity =>
            {
                entity.Property(e => e.Date).HasDefaultValueSql("(getdate())");

                entity.HasOne(d => d.SupplierFkNavigation)
                    .WithMany(p => p.Invoice)
                    .HasForeignKey(d => d.SupplierFk)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("INV_LINK_SUPPLIER");
            });

            modelBuilder.Entity<InvoiceDetail>(entity =>
            {
                entity.Property(e => e.Cost).HasDefaultValueSql("((0))");

                entity.Property(e => e.Doa).HasDefaultValueSql("((0))");

                entity.Property(e => e.Qty).HasDefaultValueSql("((0))");

                entity.HasOne(d => d.InvFkNavigation)
                    .WithMany(p => p.InvoiceDetail)
                    .HasForeignKey(d => d.InvFk)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("INV_LINK_DETAIL");

                entity.HasOne(d => d.SpeciesFkNavigation)
                    .WithMany(p => p.InvoiceDetail)
                    .HasForeignKey(d => d.SpeciesFk)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("INV_DETAIL_LINK_SPECIES");
            });

            modelBuilder.Entity<QuarantinePeriod>(entity =>
            {
                entity.Property(e => e.StartDate).HasDefaultValueSql("(getdate())");
            });

            modelBuilder.Entity<QuarantineTank>(entity =>
            {
                entity.HasOne(d => d.InvDetailFkNavigation)
                    .WithMany(p => p.QuarantineTank)
                    .HasForeignKey(d => d.InvDetailFk)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("TANK_LINK_INV_DETAIL");

                entity.HasOne(d => d.PeriodFkNavigation)
                    .WithMany(p => p.QuarantineTank)
                    .HasForeignKey(d => d.PeriodFk)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("TANK_LINK_PERIOD");

                entity.HasOne(d => d.TankFkNavigation)
                    .WithMany(p => p.QuarantineTank)
                    .HasForeignKey(d => d.TankFk)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("QUARANTINE_LINK_TANK");
            });

            modelBuilder.Entity<TankMovement>(entity =>
            {
                entity.HasOne(d => d.DestinationFkNavigation)
                    .WithMany(p => p.TankMovementDestinationFkNavigation)
                    .HasForeignKey(d => d.DestinationFk)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("DESTINATION_QUARANTINE_TANK");

                entity.HasOne(d => d.ReasonFkNavigation)
                    .WithMany(p => p.TankMovement)
                    .HasForeignKey(d => d.ReasonFk)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("MOVEMENT_REASON");

                entity.HasOne(d => d.SourceFkNavigation)
                    .WithMany(p => p.TankMovementSourceFkNavigation)
                    .HasForeignKey(d => d.SourceFk)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("SOURCE_QUARANTINE_TANK");
            });
        }
    }
}
