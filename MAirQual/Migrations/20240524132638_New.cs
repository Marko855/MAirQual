using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MAirQual.Migrations
{
    /// <inheritdoc />
    public partial class New : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FavoriteLocation_Users_UserId",
                table: "FavoriteLocation");

            migrationBuilder.DropPrimaryKey(
                name: "PK_FavoriteLocation",
                table: "FavoriteLocation");

            migrationBuilder.RenameTable(
                name: "FavoriteLocation",
                newName: "FavoriteLocations");

            migrationBuilder.RenameIndex(
                name: "IX_FavoriteLocation_UserId",
                table: "FavoriteLocations",
                newName: "IX_FavoriteLocations_UserId");

            migrationBuilder.AlterColumn<int>(
                name: "UserId",
                table: "FavoriteLocations",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_FavoriteLocations",
                table: "FavoriteLocations",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_FavoriteLocations_Users_UserId",
                table: "FavoriteLocations",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FavoriteLocations_Users_UserId",
                table: "FavoriteLocations");

            migrationBuilder.DropPrimaryKey(
                name: "PK_FavoriteLocations",
                table: "FavoriteLocations");

            migrationBuilder.RenameTable(
                name: "FavoriteLocations",
                newName: "FavoriteLocation");

            migrationBuilder.RenameIndex(
                name: "IX_FavoriteLocations_UserId",
                table: "FavoriteLocation",
                newName: "IX_FavoriteLocation_UserId");

            migrationBuilder.AlterColumn<int>(
                name: "UserId",
                table: "FavoriteLocation",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddPrimaryKey(
                name: "PK_FavoriteLocation",
                table: "FavoriteLocation",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_FavoriteLocation_Users_UserId",
                table: "FavoriteLocation",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id");
        }
    }
}
