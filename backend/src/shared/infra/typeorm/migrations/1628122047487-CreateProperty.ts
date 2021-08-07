import {MigrationInterface, QueryRunner, Table} from "typeorm";

export default class CreateProperty1628122047487 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "properties",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "title",
                        type: "varchar"
                    },
                    {
                        name: "description",
                        type: "varchar"
                    },
                    {
                        name: "value",
                        type: "integer"
                    },
                    {
                        name: "area",
                        type: "integer"
                    },
                    {
                        name: "address",
                        type: "varchar"
                    },
                    {
                        name: "public_place",
                        type: "varchar"
                    },
                    {
                        name: "house_number",
                        type: "integer"
                    },
                    {
                        name: "complement",
                        type: "varchar"
                    },
                    {
                        name: "district",
                        type: "varchar"
                    },
                    {
                        name: "cep",
                        type: "integer"
                    },
                    {
                        name: "city",
                        type: "varchar"
                    },
                    {
                        name: "uf",
                        type: "varchar"
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()"
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("properties");
    }

}
