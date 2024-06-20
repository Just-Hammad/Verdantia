using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Pomelo.EntityFrameworkCore.MySql.Scaffolding.Internal;

namespace Verdantia_Server.Models;

public partial class VerdantiaContext : DbContext
{
    public VerdantiaContext()
    {
    }

    public VerdantiaContext(DbContextOptions<VerdantiaContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Farm> Farms { get; set; }

    public virtual DbSet<FarmUser> FarmUsers { get; set; }

    public virtual DbSet<Fertilizer> Fertilizers { get; set; }

    public virtual DbSet<Inventory> Inventories { get; set; }

    public virtual DbSet<InventoryLog> InventoryLogs { get; set; }

    public virtual DbSet<Pesticide> Pesticides { get; set; }

    public virtual DbSet<Plantinfo> Plantinfos { get; set; }

    public virtual DbSet<Task> Tasks { get; set; }

    public virtual DbSet<TaskLog> TaskLogs { get; set; }

    public virtual DbSet<Tree> Trees { get; set; }

    public virtual DbSet<User> Users { get; set; }

    public virtual DbSet<UserLog> UserLogs { get; set; }

    public virtual DbSet<Usertype> Usertypes { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseMySql("server=127.0.0.1;port=3306;database=verdantia;uid=root;pwd=Apple@786", Microsoft.EntityFrameworkCore.ServerVersion.Parse("8.0.35-mysql"));

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder
            .UseCollation("utf8mb4_0900_ai_ci")
            .HasCharSet("utf8mb4");

        modelBuilder.Entity<Farm>(entity =>
        {
            entity.HasKey(e => e.FarmId).HasName("PRIMARY");

            entity.ToTable("farms");

            entity.Property(e => e.FarmId).HasColumnName("FarmID");
            entity.Property(e => e.FarmName).HasMaxLength(50);
            entity.Property(e => e.Location).HasMaxLength(255);
        });

        modelBuilder.Entity<FarmUser>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("farm_user");

            entity.HasIndex(e => e.FarmId, "FarmID");

            entity.HasIndex(e => e.UserId, "UserID");

            entity.Property(e => e.FarmId).HasColumnName("FarmID");
            entity.Property(e => e.UserId).HasColumnName("UserID");

            entity.HasOne(d => d.Farm).WithMany()
                .HasForeignKey(d => d.FarmId)
                .HasConstraintName("farm_user_ibfk_2");

            entity.HasOne(d => d.User).WithMany()
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("farm_user_ibfk_1");
        });

        modelBuilder.Entity<Fertilizer>(entity =>
        {
            entity.HasKey(e => e.FertilizerId).HasName("PRIMARY");

            entity.ToTable("fertilizers");

            entity.Property(e => e.FertilizerId)
                .HasMaxLength(10)
                .HasColumnName("FertilizerID");
            entity.Property(e => e.Fname)
                .HasMaxLength(255)
                .HasColumnName("FName");
        });

        modelBuilder.Entity<Inventory>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("inventory");

            entity.Property(e => e.FarmId).HasColumnName("FarmID");
            entity.Property(e => e.InventoryId)
                .HasMaxLength(10)
                .HasColumnName("InventoryID");
            entity.Property(e => e.Quantity).HasPrecision(10);
        });

        modelBuilder.Entity<InventoryLog>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("inventory_logs");

            entity.Property(e => e.InventoryId)
                .HasMaxLength(10)
                .HasColumnName("InventoryID");
            entity.Property(e => e.NewQuantity).HasPrecision(10);
            entity.Property(e => e.OldQuantity).HasPrecision(10);
            entity.Property(e => e.UpdateTime)
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .HasColumnType("timestamp");
            entity.Property(e => e.UserId).HasColumnName("UserID");
        });

        modelBuilder.Entity<Pesticide>(entity =>
        {
            entity.HasKey(e => e.PesticideId).HasName("PRIMARY");

            entity.ToTable("pesticides");

            entity.Property(e => e.PesticideId)
                .HasMaxLength(10)
                .HasColumnName("PesticideID");
            entity.Property(e => e.Pname)
                .HasMaxLength(255)
                .HasColumnName("PName");
        });

        modelBuilder.Entity<Plantinfo>(entity =>
        {
            entity.HasKey(e => e.PlantId).HasName("PRIMARY");

            entity.ToTable("plantinfo");

            entity.HasIndex(e => e.FertilizerId, "FertilizerID");

            entity.HasIndex(e => e.PesticideId, "PesticideID");

            entity.Property(e => e.PlantId).HasColumnName("PlantID");
            entity.Property(e => e.Famount).HasColumnName("FAmount");
            entity.Property(e => e.Fduration).HasColumnName("FDuration");
            entity.Property(e => e.FertilizerId)
                .HasMaxLength(10)
                .HasColumnName("FertilizerID");
            entity.Property(e => e.Iduration).HasColumnName("IDuration");
            entity.Property(e => e.Irrigation).HasPrecision(10);
            entity.Property(e => e.Pamount).HasColumnName("PAmount");
            entity.Property(e => e.Pduartion).HasColumnName("PDuartion");
            entity.Property(e => e.PesticideId)
                .HasMaxLength(10)
                .HasColumnName("PesticideID");
            entity.Property(e => e.Pname)
                .HasMaxLength(255)
                .HasColumnName("PName");

            entity.HasOne(d => d.Fertilizer).WithMany(p => p.Plantinfos)
                .HasForeignKey(d => d.FertilizerId)
                .HasConstraintName("plantinfo_ibfk_1");

            entity.HasOne(d => d.Pesticide).WithMany(p => p.Plantinfos)
                .HasForeignKey(d => d.PesticideId)
                .HasConstraintName("plantinfo_ibfk_2");
        });

        modelBuilder.Entity<Task>(entity =>
        {
            entity.HasKey(e => e.TaskId).HasName("PRIMARY");

            entity.ToTable("tasks");

            entity.Property(e => e.TaskId).HasColumnName("TaskID");
            entity.Property(e => e.Scheduled).HasColumnType("timestamp");
            entity.Property(e => e.Task1)
                .HasMaxLength(255)
                .HasColumnName("Task");
            entity.Property(e => e.TreeId)
                .HasMaxLength(50)
                .HasColumnName("TreeID");
            entity.Property(e => e.UserId).HasColumnName("UserID");
        });

        modelBuilder.Entity<TaskLog>(entity =>
        {
            entity.HasKey(e => e.TaskId).HasName("PRIMARY");

            entity.ToTable("task_logs");

            entity.Property(e => e.TaskId)
                .ValueGeneratedNever()
                .HasColumnName("TaskID");
            entity.Property(e => e.Creation)
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .HasColumnType("timestamp");
            entity.Property(e => e.Deletion)
                .HasDefaultValueSql("'2024-01-01 00:00:00'")
                .HasColumnType("timestamp");
            entity.Property(e => e.Scheduled).HasColumnType("timestamp");
            entity.Property(e => e.Task).HasMaxLength(255);
            entity.Property(e => e.TaskStatus)
                .HasMaxLength(255)
                .HasDefaultValueSql("'Pending'")
                .HasColumnName("Task_Status");
            entity.Property(e => e.TreeId)
                .HasMaxLength(50)
                .HasColumnName("TreeID");
            entity.Property(e => e.UserId).HasColumnName("UserID");
        });

        modelBuilder.Entity<Tree>(entity =>
        {
            entity.HasKey(e => e.TreeId).HasName("PRIMARY");

            entity.ToTable("trees");

            entity.HasIndex(e => new { e.TreeId, e.LastFertilized }, "idx_TreeID_LastFertilized");

            entity.HasIndex(e => new { e.TreeId, e.LastPesticide }, "idx_TreeID_LastPesticide");

            entity.HasIndex(e => new { e.TreeId, e.LastWatered }, "idx_TreeID_LastWatered");

            entity.Property(e => e.TreeId)
                .HasMaxLength(50)
                .HasColumnName("TreeID");
            entity.Property(e => e.Age).HasColumnName("AGE");
            entity.Property(e => e.FarmId).HasColumnName("FarmID");
            entity.Property(e => e.LastFertilized).HasColumnType("timestamp");
            entity.Property(e => e.LastPesticide).HasColumnType("timestamp");
            entity.Property(e => e.LastWatered).HasColumnType("timestamp");
            entity.Property(e => e.Tcolumn).HasColumnName("TColumn");
            entity.Property(e => e.Trow).HasColumnName("TRow");
            entity.Property(e => e.TypeId).HasColumnName("TypeID");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.UserId).HasName("PRIMARY");

            entity.ToTable("users");

            entity.HasIndex(e => e.UserName, "UserName").IsUnique();

            entity.HasIndex(e => e.UserTypeId, "UserTypeID");

            entity.Property(e => e.UserId).HasColumnName("UserID");
            entity.Property(e => e.Email).HasMaxLength(255);
            entity.Property(e => e.Phone).HasMaxLength(20);
            entity.Property(e => e.UName)
                .HasMaxLength(50)
                .HasColumnName("uName");
            entity.Property(e => e.UPassword)
                .HasMaxLength(50)
                .HasColumnName("uPassword");
            entity.Property(e => e.UserName).HasMaxLength(50);
            entity.Property(e => e.UserTypeId).HasColumnName("UserTypeID");

            entity.HasOne(d => d.UserType).WithMany(p => p.Users)
                .HasForeignKey(d => d.UserTypeId)
                .HasConstraintName("users_ibfk_1");
        });

        modelBuilder.Entity<UserLog>(entity =>
        {
            entity.HasKey(e => e.LogId).HasName("PRIMARY");

            entity.ToTable("user_logs");

            entity.Property(e => e.LogId).HasColumnName("logId");
            entity.Property(e => e.Act).HasMaxLength(255);
            entity.Property(e => e.Email).HasMaxLength(255);
            entity.Property(e => e.Phone).HasMaxLength(20);
            entity.Property(e => e.UName)
                .HasMaxLength(50)
                .HasColumnName("uName");
            entity.Property(e => e.Updated).HasColumnType("timestamp");
            entity.Property(e => e.UpdatedBy).HasMaxLength(255);
            entity.Property(e => e.UserId).HasColumnName("UserID");
            entity.Property(e => e.UserName).HasMaxLength(50);
            entity.Property(e => e.UserTypeId).HasColumnName("UserTypeID");
        });

        modelBuilder.Entity<Usertype>(entity =>
        {
            entity.HasKey(e => e.UserTypeId).HasName("PRIMARY");

            entity.ToTable("usertypes");

            entity.Property(e => e.UserTypeId)
                .ValueGeneratedNever()
                .HasColumnName("UserTypeID");
            entity.Property(e => e.UserType1)
                .HasMaxLength(50)
                .HasColumnName("UserType");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
