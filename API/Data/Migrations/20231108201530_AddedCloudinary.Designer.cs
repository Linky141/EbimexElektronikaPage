﻿// <auto-generated />
using System;
using API.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace API.Data.Migrations
{
    [DbContext(typeof(ServiceContext))]
    [Migration("20231108201530_AddedCloudinary")]
    partial class AddedCloudinary
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.11")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("API.Entities.Comment", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("Content")
                        .HasColumnType("text");

                    b.Property<DateTime>("DateTime")
                        .HasColumnType("timestamp with time zone");

                    b.Property<int>("ServiceId")
                        .HasColumnType("integer");

                    b.Property<string>("User")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("ServiceId");

                    b.ToTable("Comment");
                });

            modelBuilder.Entity("API.Entities.Configuration", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<int>("ContactsEnabled")
                        .HasColumnType("integer");

                    b.Property<int>("InfoEnabled")
                        .HasColumnType("integer");

                    b.Property<int>("ServicesEnabled")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.ToTable("Configurations");
                });

            modelBuilder.Entity("API.Entities.Contact", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("AddressCity")
                        .HasColumnType("text");

                    b.Property<string>("AddressCountry")
                        .HasColumnType("text");

                    b.Property<string>("AddressNumber1")
                        .HasColumnType("text");

                    b.Property<string>("AddressNumber2")
                        .HasColumnType("text");

                    b.Property<string>("AddressPostal")
                        .HasColumnType("text");

                    b.Property<string>("AddressStreet")
                        .HasColumnType("text");

                    b.Property<string>("Email")
                        .HasColumnType("text");

                    b.Property<string>("Phone")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Contacts");
                });

            modelBuilder.Entity("API.Entities.ContactCustom", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<int>("ContactId")
                        .HasColumnType("integer");

                    b.Property<string>("Content")
                        .HasColumnType("text");

                    b.Property<string>("Name")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("ContactId");

                    b.ToTable("ContactCustom");
                });

            modelBuilder.Entity("API.Entities.HomePage", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("Description")
                        .HasColumnType("text");

                    b.Property<string>("Header")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("HomePages");
                });

            modelBuilder.Entity("API.Entities.Info", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("OpeningHoursFridayEnd")
                        .HasColumnType("text");

                    b.Property<string>("OpeningHoursFridayStart")
                        .HasColumnType("text");

                    b.Property<string>("OpeningHoursMondayEnd")
                        .HasColumnType("text");

                    b.Property<string>("OpeningHoursMondayStart")
                        .HasColumnType("text");

                    b.Property<string>("OpeningHoursSaturdayEnd")
                        .HasColumnType("text");

                    b.Property<string>("OpeningHoursSaturdayStart")
                        .HasColumnType("text");

                    b.Property<string>("OpeningHoursSundayEnd")
                        .HasColumnType("text");

                    b.Property<string>("OpeningHoursSundayStart")
                        .HasColumnType("text");

                    b.Property<string>("OpeningHoursThursdayEnd")
                        .HasColumnType("text");

                    b.Property<string>("OpeningHoursThursdayStart")
                        .HasColumnType("text");

                    b.Property<string>("OpeningHoursTuesdayEnd")
                        .HasColumnType("text");

                    b.Property<string>("OpeningHoursTuesdayStart")
                        .HasColumnType("text");

                    b.Property<string>("OpeningHoursWednesdayEnd")
                        .HasColumnType("text");

                    b.Property<string>("OpeningHoursWednesdayStart")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Infos");
                });

            modelBuilder.Entity("API.Entities.InfoAnnouncement", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("Content")
                        .HasColumnType("text");

                    b.Property<DateTime>("DateAndTime")
                        .HasColumnType("timestamp with time zone");

                    b.Property<int>("InfoId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("InfoId");

                    b.ToTable("InfoAnnouncement");
                });

            modelBuilder.Entity("API.Entities.PictureUrlHomePage", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<int>("HomePageId")
                        .HasColumnType("integer");

                    b.Property<string>("PublicId")
                        .HasColumnType("text");

                    b.Property<string>("Url")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("HomePageId");

                    b.ToTable("PictureUrlHomePage");
                });

            modelBuilder.Entity("API.Entities.PictureUrlService", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("PublicId")
                        .HasColumnType("text");

                    b.Property<int>("ServiceId")
                        .HasColumnType("integer");

                    b.Property<string>("Url")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("ServiceId");

                    b.ToTable("PictureUrlService");
                });

            modelBuilder.Entity("API.Entities.Service", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("ClientEmail")
                        .HasColumnType("text");

                    b.Property<string>("ClientUsername")
                        .HasColumnType("text");

                    b.Property<int>("CurrentStatus")
                        .HasColumnType("integer");

                    b.Property<string>("Description")
                        .HasColumnType("text");

                    b.Property<string>("Name")
                        .HasColumnType("text");

                    b.Property<DateTime>("PlannedDateOfCompletion")
                        .HasColumnType("timestamp with time zone");

                    b.Property<int>("Price")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.ToTable("Services");
                });

            modelBuilder.Entity("API.Entities.User", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("text");

                    b.Property<int>("AccessFailedCount")
                        .HasColumnType("integer");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("text");

                    b.Property<string>("Email")
                        .HasMaxLength(256)
                        .HasColumnType("character varying(256)");

                    b.Property<bool>("EmailConfirmed")
                        .HasColumnType("boolean");

                    b.Property<bool>("LockoutEnabled")
                        .HasColumnType("boolean");

                    b.Property<DateTimeOffset?>("LockoutEnd")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("NormalizedEmail")
                        .HasMaxLength(256)
                        .HasColumnType("character varying(256)");

                    b.Property<string>("NormalizedUserName")
                        .HasMaxLength(256)
                        .HasColumnType("character varying(256)");

                    b.Property<string>("PasswordHash")
                        .HasColumnType("text");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("text");

                    b.Property<bool>("PhoneNumberConfirmed")
                        .HasColumnType("boolean");

                    b.Property<string>("SecurityStamp")
                        .HasColumnType("text");

                    b.Property<bool>("TwoFactorEnabled")
                        .HasColumnType("boolean");

                    b.Property<string>("UserName")
                        .HasMaxLength(256)
                        .HasColumnType("character varying(256)");

                    b.HasKey("Id");

                    b.HasIndex("NormalizedEmail")
                        .HasDatabaseName("EmailIndex");

                    b.HasIndex("NormalizedUserName")
                        .IsUnique()
                        .HasDatabaseName("UserNameIndex");

                    b.ToTable("AspNetUsers", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRole", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("text");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("text");

                    b.Property<string>("Name")
                        .HasMaxLength(256)
                        .HasColumnType("character varying(256)");

                    b.Property<string>("NormalizedName")
                        .HasMaxLength(256)
                        .HasColumnType("character varying(256)");

                    b.HasKey("Id");

                    b.HasIndex("NormalizedName")
                        .IsUnique()
                        .HasDatabaseName("RoleNameIndex");

                    b.ToTable("AspNetRoles", (string)null);

                    b.HasData(
                        new
                        {
                            Id = "a000ef59-1242-4909-a022-985e0f3d1529",
                            Name = "Member",
                            NormalizedName = "MEMBER"
                        },
                        new
                        {
                            Id = "8f67987b-61b6-4479-84f6-1d4ea7314010",
                            Name = "Admin",
                            NormalizedName = "ADMIN"
                        });
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("ClaimType")
                        .HasColumnType("text");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("text");

                    b.Property<string>("RoleId")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetRoleClaims", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("ClaimType")
                        .HasColumnType("text");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("text");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserClaims", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.Property<string>("LoginProvider")
                        .HasColumnType("text");

                    b.Property<string>("ProviderKey")
                        .HasColumnType("text");

                    b.Property<string>("ProviderDisplayName")
                        .HasColumnType("text");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("LoginProvider", "ProviderKey");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserLogins", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("text");

                    b.Property<string>("RoleId")
                        .HasColumnType("text");

                    b.HasKey("UserId", "RoleId");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetUserRoles", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("text");

                    b.Property<string>("LoginProvider")
                        .HasColumnType("text");

                    b.Property<string>("Name")
                        .HasColumnType("text");

                    b.Property<string>("Value")
                        .HasColumnType("text");

                    b.HasKey("UserId", "LoginProvider", "Name");

                    b.ToTable("AspNetUserTokens", (string)null);
                });

            modelBuilder.Entity("API.Entities.Comment", b =>
                {
                    b.HasOne("API.Entities.Service", "Service")
                        .WithMany("Comments")
                        .HasForeignKey("ServiceId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Service");
                });

            modelBuilder.Entity("API.Entities.ContactCustom", b =>
                {
                    b.HasOne("API.Entities.Contact", "Contact")
                        .WithMany("ContactCustoms")
                        .HasForeignKey("ContactId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Contact");
                });

            modelBuilder.Entity("API.Entities.InfoAnnouncement", b =>
                {
                    b.HasOne("API.Entities.Info", "Info")
                        .WithMany("InfoAnnouncements")
                        .HasForeignKey("InfoId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Info");
                });

            modelBuilder.Entity("API.Entities.PictureUrlHomePage", b =>
                {
                    b.HasOne("API.Entities.HomePage", "HomePage")
                        .WithMany("PictureUrls")
                        .HasForeignKey("HomePageId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("HomePage");
                });

            modelBuilder.Entity("API.Entities.PictureUrlService", b =>
                {
                    b.HasOne("API.Entities.Service", "Service")
                        .WithMany("PictureUrls")
                        .HasForeignKey("ServiceId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Service");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.HasOne("API.Entities.User", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.HasOne("API.Entities.User", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("API.Entities.User", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.HasOne("API.Entities.User", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("API.Entities.Contact", b =>
                {
                    b.Navigation("ContactCustoms");
                });

            modelBuilder.Entity("API.Entities.HomePage", b =>
                {
                    b.Navigation("PictureUrls");
                });

            modelBuilder.Entity("API.Entities.Info", b =>
                {
                    b.Navigation("InfoAnnouncements");
                });

            modelBuilder.Entity("API.Entities.Service", b =>
                {
                    b.Navigation("Comments");

                    b.Navigation("PictureUrls");
                });
#pragma warning restore 612, 618
        }
    }
}
