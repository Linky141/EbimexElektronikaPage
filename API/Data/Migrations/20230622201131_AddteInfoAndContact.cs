using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddteInfoAndContact : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Contacts",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Email = table.Column<string>(type: "TEXT", nullable: true),
                    Phone = table.Column<string>(type: "TEXT", nullable: true),
                    Email2 = table.Column<string>(type: "TEXT", nullable: true),
                    Phone2 = table.Column<string>(type: "TEXT", nullable: true),
                    AddressCountry = table.Column<string>(type: "TEXT", nullable: true),
                    AddressCity = table.Column<string>(type: "TEXT", nullable: true),
                    AddressStreet = table.Column<string>(type: "TEXT", nullable: true),
                    AddressNumber1 = table.Column<string>(type: "TEXT", nullable: true),
                    AddressNumber2 = table.Column<string>(type: "TEXT", nullable: true),
                    AddressPostal = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Contacts", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Infos",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    OpeningHoursMondayStart = table.Column<string>(type: "TEXT", nullable: true),
                    OpeningHoursMondayEnd = table.Column<string>(type: "TEXT", nullable: true),
                    OpeningHoursTuesdayStart = table.Column<string>(type: "TEXT", nullable: true),
                    OpeningHoursTuesdayEnd = table.Column<string>(type: "TEXT", nullable: true),
                    OpeningHoursWednesdayStart = table.Column<string>(type: "TEXT", nullable: true),
                    OpeningHoursWednesdayEnd = table.Column<string>(type: "TEXT", nullable: true),
                    OpeningHoursThursdayStart = table.Column<string>(type: "TEXT", nullable: true),
                    OpeningHoursThursdayEnd = table.Column<string>(type: "TEXT", nullable: true),
                    OpeningHoursFridayStart = table.Column<string>(type: "TEXT", nullable: true),
                    OpeningHoursFridayEnd = table.Column<string>(type: "TEXT", nullable: true),
                    OpeningHoursSaturdayStart = table.Column<string>(type: "TEXT", nullable: true),
                    OpeningHoursSaturdayEnd = table.Column<string>(type: "TEXT", nullable: true),
                    OpeningHoursSundayStart = table.Column<string>(type: "TEXT", nullable: true),
                    OpeningHoursSundayEnd = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Infos", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ContactCustom",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", nullable: true),
                    Content = table.Column<string>(type: "TEXT", nullable: true),
                    ContactId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ContactCustom", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ContactCustom_Contacts_ContactId",
                        column: x => x.ContactId,
                        principalTable: "Contacts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "InfoAnnouncement",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    DateAndTime = table.Column<DateTime>(type: "TEXT", nullable: false),
                    Content = table.Column<string>(type: "TEXT", nullable: true),
                    InfoId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_InfoAnnouncement", x => x.Id);
                    table.ForeignKey(
                        name: "FK_InfoAnnouncement_Infos_InfoId",
                        column: x => x.InfoId,
                        principalTable: "Infos",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ContactCustom_ContactId",
                table: "ContactCustom",
                column: "ContactId");

            migrationBuilder.CreateIndex(
                name: "IX_InfoAnnouncement_InfoId",
                table: "InfoAnnouncement",
                column: "InfoId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ContactCustom");

            migrationBuilder.DropTable(
                name: "InfoAnnouncement");

            migrationBuilder.DropTable(
                name: "Contacts");

            migrationBuilder.DropTable(
                name: "Infos");
        }
    }
}
