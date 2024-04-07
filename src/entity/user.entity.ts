import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Index('IDX_OPEN_ID', ['openUid'], {})
@Entity('user', { schema: 'game' })
export class User {
    @PrimaryGeneratedColumn({
        type: 'int',
        name: 'id',
        comment: 'id',
        unsigned: true,
    })
    id: number;

    @Column('varchar', { name: 'openUid', comment: '用户openuid', length: 255 })
    openUid: string;

    @Column('varchar', {
        name: 'nick',
        nullable: true,
        comment: '用户名',
        length: 32,
    })
    nick: string | null;

    @Column('varchar', {
        name: 'avatar',
        nullable: true,
        comment: '头像',
        length: 255,
    })
    avatar: string | null;

    @Column('timestamp', {
        name: 'gmt_created',
        comment: '创建时间',
        default: () => 'CURRENT_TIMESTAMP',
    })
    gmtCreated: Date;

    @Column('timestamp', {
        name: 'gmt_modified',
        comment: '修改时间',
        default: () => 'CURRENT_TIMESTAMP',
    })
    gmtModified: Date;
}
