using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace DSED_FINAL.Models
{
    public partial class AIMSContext : DbContext
    {
        public AIMSContext(DbContextOptions<AIMSContext> opts) : base(opts) {}

        public virtual DbSet<SystemTable> SystemTable { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer(@" Data Source=(localdb)\ProjectsV13;Initial Catalog=AIMS;Integrated Security=True ");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<SystemTable>(entity =>
            {
                entity.HasOne(d => d.GroupFkNavigation)
                    .WithMany(p => p.InverseGroupFkNavigation)
                    .HasForeignKey(d => d.GroupFk)
                    .HasConstraintName("FK_SYSTEM_TABLE_SYSTEM_TABLE");
            });
        }
    }
}
