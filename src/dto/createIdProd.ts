import { ApiProperty } from "@nestjs/swagger";

export class createIdProd {

    @ApiProperty()
    readonly id: string;

    @ApiProperty()
    readonly name: string;

    @ApiProperty()
    readonly description: string;

    @ApiProperty()
    readonly price: number;

    @ApiProperty()
    readonly commercialName: string;

    @ApiProperty()
    readonly photoUrls: string;

    @ApiProperty()
    readonly status: string;

}
