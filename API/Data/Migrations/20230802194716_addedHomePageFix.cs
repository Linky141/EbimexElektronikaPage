using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace API.Data.Migrations
{
    /// <inheritdoc />
    public partial class addedHomePageFix : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PictureUrl");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "b2ee132a-009d-485e-ac31-c8824b85c5e2");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "ff5fcd07-ac22-446c-b093-174e8597bc40");

            migrationBuilder.CreateTable(
                name: "PictureUrlHomePage",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Url = table.Column<string>(type: "TEXT", nullable: true),
                    PublicId = table.Column<string>(type: "TEXT", nullable: true),
                    HomePageId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PictureUrlHomePage", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PictureUrlHomePage_HomePages_HomePageId",
                        column: x => x.HomePageId,
                        principalTable: "HomePages",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PictureUrlService",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Url = table.Column<string>(type: "TEXT", nullable: true),
                    PublicId = table.Column<string>(type: "TEXT", nullable: true),
                    ServiceId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PictureUrlService", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PictureUrlService_Services_ServiceId",
                        column: x => x.ServiceId,
                        principalTable: "Services",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "37536715-3dfd-4600-bc6f-0b3bae12f28c", null, "Admin", "ADMIN" },
                    { "8d08099a-4d4e-4d48-aa6c-9c2c8445c33c", null, "Member", "MEMBER" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_PictureUrlHomePage_HomePageId",
                table: "PictureUrlHomePage",
                column: "HomePageId");

            migrationBuilder.CreateIndex(
                name: "IX_PictureUrlService_ServiceId",
                table: "PictureUrlService",
                column: "ServiceId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PictureUrlHomePage");

            migrationBuilder.DropTable(
                name: "PictureUrlService");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "37536715-3dfd-4600-bc6f-0b3bae12f28c");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "8d08099a-4d4e-4d48-aa6c-9c2c8445c33c");

            migrationBuilder.CreateTable(
                name: "PictureUrl",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    ServiceId = table.Column<int>(type: "INTEGER", nullable: false),
                    HomePageId = table.Column<int>(type: "INTEGER", nullable: true),
                    PublicId = table.Column<string>(type: "TEXT", nullable: true),
                    Url = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PictureUrl", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PictureUrl_HomePages_HomePageId",
                        column: x => x.HomePageId,
                        principalTable: "HomePages",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_PictureUrl_Services_ServiceId",
                        column: x => x.ServiceId,
                        principalTable: "Services",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
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

            migrationBuilder.CreateIndex(
                name: "IX_PictureUrl_ServiceId",
                table: "PictureUrl",
                column: "ServiceId");
        }
    }
}
