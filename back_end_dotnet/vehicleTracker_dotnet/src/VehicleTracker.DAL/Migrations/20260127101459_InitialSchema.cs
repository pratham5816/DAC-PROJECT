using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace VehicleTracker.DAL.Migrations
{
    /// <inheritdoc />
    public partial class InitialSchema : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterDatabase()
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Checkpoint",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(type: "varchar(255)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Latitude = table.Column<double>(type: "double", nullable: false),
                    Longitude = table.Column<double>(type: "double", nullable: false),
                    RadiusKm = table.Column<double>(type: "double", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Checkpoint", x => x.Id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Driver",
                columns: table => new
                {
                    DriverId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    DriverName = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    LicenseNumber = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Email = table.Column<string>(type: "varchar(255)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Password = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    IsActive = table.Column<bool>(type: "tinyint(1)", nullable: false, defaultValue: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Driver", x => x.DriverId);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "User",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Email = table.Column<string>(type: "varchar(255)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Password = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_User", x => x.Id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Vehicle",
                columns: table => new
                {
                    VechicleNumber = table.Column<string>(type: "varchar(30)", maxLength: 30, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    VehicleType = table.Column<string>(type: "varchar(30)", maxLength: 30, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Challan_Exp = table.Column<int>(type: "int", nullable: false, defaultValue: 0),
                    Vehicle_Exp = table.Column<int>(type: "int", nullable: false, defaultValue: 0),
                    user = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Vehicle", x => x.VechicleNumber);
                    table.ForeignKey(
                        name: "FK_Vehicle_User_user",
                        column: x => x.user,
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Drive",
                columns: table => new
                {
                    DriveId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    vehicle_id = table.Column<string>(type: "varchar(30)", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    driver_id = table.Column<int>(type: "int", nullable: false),
                    Status = table.Column<string>(type: "varchar(20)", maxLength: 20, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Longitude = table.Column<double>(type: "double", nullable: false, defaultValue: 0.0),
                    Latitude = table.Column<double>(type: "double", nullable: false, defaultValue: 0.0),
                    started_point = table.Column<int>(type: "int", nullable: false),
                    ended_point = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Drive", x => x.DriveId);
                    table.ForeignKey(
                        name: "FK_Drive_Checkpoint_ended_point",
                        column: x => x.ended_point,
                        principalTable: "Checkpoint",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Drive_Checkpoint_started_point",
                        column: x => x.started_point,
                        principalTable: "Checkpoint",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Drive_Driver_driver_id",
                        column: x => x.driver_id,
                        principalTable: "Driver",
                        principalColumn: "DriverId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Drive_Vehicle_vehicle_id",
                        column: x => x.vehicle_id,
                        principalTable: "Vehicle",
                        principalColumn: "VechicleNumber",
                        onDelete: ReferentialAction.Restrict);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_Checkpoint_Name",
                table: "Checkpoint",
                column: "Name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Drive_driver_id",
                table: "Drive",
                column: "driver_id");

            migrationBuilder.CreateIndex(
                name: "IX_Drive_ended_point",
                table: "Drive",
                column: "ended_point");

            migrationBuilder.CreateIndex(
                name: "IX_Drive_started_point",
                table: "Drive",
                column: "started_point");

            migrationBuilder.CreateIndex(
                name: "IX_Drive_vehicle_id",
                table: "Drive",
                column: "vehicle_id");

            migrationBuilder.CreateIndex(
                name: "IX_Driver_Email",
                table: "Driver",
                column: "Email",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_User_Email",
                table: "User",
                column: "Email",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Vehicle_user",
                table: "Vehicle",
                column: "user");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Drive");

            migrationBuilder.DropTable(
                name: "Checkpoint");

            migrationBuilder.DropTable(
                name: "Driver");

            migrationBuilder.DropTable(
                name: "Vehicle");

            migrationBuilder.DropTable(
                name: "User");
        }
    }
}
