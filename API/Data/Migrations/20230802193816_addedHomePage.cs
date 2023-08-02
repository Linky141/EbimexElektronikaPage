using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace API.Data.Migrations
{
    /// <inheritdoc />
    public partial class addedHomePage : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "201ff157-01fb-429b-ba75-d8c1773cec89");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "eb84e3bf-7c4b-4667-8fdf-771e68383542");

            migrationBuilder.AddColumn<int>(
                name: "HomePageId",
                table: "PictureUrl",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "HomePages",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Header = table.Column<string>(type: "TEXT", nullable: true),
                    Description = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HomePages", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "b2ee132a-009d-485e-ac31-c8824b85c5e2", null, "Admin", "ADMIN" },
                    { "ff5fcd07-ac22-446c-b093-174e8597bc40", null, "Member", "MEMBER" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_PictureUrl_HomePageId",
                table: "PictureUrl",
                column: "HomePageId");

            migrationBuilder.AddForeignKey(
                name: "FK_PictureUrl_HomePages_HomePageId",
                table: "PictureUrl",
                column: "HomePageId",
                principalTable: "HomePages",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PictureUrl_HomePages_HomePageId",
                table: "PictureUrl");

            migrationBuilder.DropTable(
                name: "HomePages");

            migrationBuilder.DropIndex(
                name: "IX_PictureUrl_HomePageId",
                table: "PictureUrl");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "b2ee132a-009d-485e-ac31-c8824b85c5e2");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "ff5fcd07-ac22-446c-b093-174e8597bc40");

            migrationBuilder.DropColumn(
                name: "HomePageId",
                table: "PictureUrl");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "201ff157-01fb-429b-ba75-d8c1773cec89", null, "Member", "MEMBER" },
                    { "eb84e3bf-7c4b-4667-8fdf-771e68383542", null, "Admin", "ADMIN" }
                });
        }
    }
}
