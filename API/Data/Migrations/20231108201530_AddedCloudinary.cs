using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace API.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddedCloudinary : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "3e7bb20f-384c-488b-a3c9-4ad1395325f5");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "7d9b3d17-d826-4a47-9732-d88629e94330");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "8f67987b-61b6-4479-84f6-1d4ea7314010", null, "Admin", "ADMIN" },
                    { "a000ef59-1242-4909-a022-985e0f3d1529", null, "Member", "MEMBER" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "8f67987b-61b6-4479-84f6-1d4ea7314010");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "a000ef59-1242-4909-a022-985e0f3d1529");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "3e7bb20f-384c-488b-a3c9-4ad1395325f5", null, "Admin", "ADMIN" },
                    { "7d9b3d17-d826-4a47-9732-d88629e94330", null, "Member", "MEMBER" }
                });
        }
    }
}
