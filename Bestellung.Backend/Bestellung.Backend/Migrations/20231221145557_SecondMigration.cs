using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Bestellung.Backend.Migrations
{
    /// <inheritdoc />
    public partial class SecondMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "GroupOrderId",
                table: "Order",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_Order_GroupOrderId",
                table: "Order",
                column: "GroupOrderId");

            migrationBuilder.AddForeignKey(
                name: "FK_Order_GroupOrder_GroupOrderId",
                table: "Order",
                column: "GroupOrderId",
                principalTable: "GroupOrder",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Order_GroupOrder_GroupOrderId",
                table: "Order");

            migrationBuilder.DropIndex(
                name: "IX_Order_GroupOrderId",
                table: "Order");

            migrationBuilder.DropColumn(
                name: "GroupOrderId",
                table: "Order");
        }
    }
}
