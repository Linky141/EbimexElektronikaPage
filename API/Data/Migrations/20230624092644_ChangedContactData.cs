using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Data.Migrations
{
    /// <inheritdoc />
    public partial class ChangedContactData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Email2",
                table: "Contacts");

            migrationBuilder.DropColumn(
                name: "Phone2",
                table: "Contacts");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Email2",
                table: "Contacts",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Phone2",
                table: "Contacts",
                type: "TEXT",
                nullable: true);
        }
    }
}
