using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace DSED_FINAL.Models
{
    public partial class AIMSContext : DbContext
    {
        public AIMSContext(DbContextOptions<AIMSContext> opts) : base(opts) { }

        public virtual DbSet<DailyLog> DailyLog { get; set; }
        public virtual DbSet<Mortality> Mortality { get; set; }
        public virtual DbSet<Species> Species { get; set; }
        public virtual DbSet<SystemTable> SystemTable { get; set; }
        public virtual DbSet<TankLog> TankLog { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) {}

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<DailyLog>(entity =>
            {
                entity.HasOne(d => d.LogFkNavigation)
                    .WithMany(p => p.DailyLog)
                    .HasForeignKey(d => d.LogFk)
                    .OnDelete(DeleteBehavior.ClientSetNull);

                entity.HasOne(d => d.ReasonFkNavigation)
                    .WithMany(p => p.DailyLog)
                    .HasForeignKey(d => d.ReasonFk)
                    .OnDelete(DeleteBehavior.ClientSetNull);
            });

            modelBuilder.Entity<TankLog>(entity =>
            {
                entity.HasIndex(e => e.SpeciesFk);

                entity.HasOne(d => d.SpeciesFkNavigation)
                    .WithMany(p => p.TankLog)
                    .HasForeignKey(d => d.SpeciesFk)
                    .OnDelete(DeleteBehavior.ClientSetNull);
            });
        }
    }
}
