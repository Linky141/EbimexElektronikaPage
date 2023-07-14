using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace API.Data.Migrations
{
    /// <inheritdoc />
    public partial class Settings : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "3dea0458-44a2-45ab-9336-2453685ea0ce");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "6102ba97-d1c5-4c11-8fd3-144e4516e53e");

            migrationBuilder.CreateTable(
                name: "Configurations",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    InfoEnabled = table.Column<int>(type: "INTEGER", nullable: false),
                    ContactsEnabled = table.Column<int>(type: "INTEGER", nullable: false),
                    ServicesEnabled = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Configurations", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "201ff157-01fb-429b-ba75-d8c1773cec89", null, "Member", "MEMBER" },
                    { "eb84e3bf-7c4b-4667-8fdf-771e68383542", null, "Admin", "ADMIN" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Configurations");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "201ff157-01fb-429b-ba75-d8c1773cec89");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "eb84e3bf-7c4b-4667-8fdf-771e68383542");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "3dea0458-44a2-45ab-9336-2453685ea0ce", null, "Member", "MEMBER" },
                    { "6102ba97-d1c5-4c11-8fd3-144e4516e53e", null, "Admin", "ADMIN" }
                });
        }
    }
}
