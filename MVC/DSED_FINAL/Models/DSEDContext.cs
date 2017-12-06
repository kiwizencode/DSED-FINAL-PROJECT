using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace DSED_FINAL.Models
{
    public partial class DSEDContext : DbContext
    {
        public DSEDContext(DbContextOptions<DSEDContext> opts) : base(opts) { }

        public virtual DbSet<PetSize> PetSize { get; set; }
        public virtual DbSet<QuarantinePeriod> QuarantinePeriod { get; set; }
        public virtual DbSet<Species> Species { get; set; }
        public virtual DbSet<Tank> Tank { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder){}

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<QuarantinePeriod>(entity =>
            {
                entity.Property(e => e.StartDate).HasDefaultValueSql("(getdate())");
            });
        }
    }
}
