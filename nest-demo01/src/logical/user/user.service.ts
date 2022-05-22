import { Injectable } from '@nestjs/common';
import { QueryTypes, Sequelize } from 'sequelize';
import sequelize from 'src/database/sequelize';

@Injectable()
export class UserService {
  async findOne(userName: string): Promise<any | undefined> {
    const sql = `
      SELECT
        user_id id, real_name realName, role
      FROM
        admin_user
      WHERE
        account_name = '${userName}'
    `;

    try {
      const res = await sequelize.query(sql, {
        type: QueryTypes.SELECT,
        raw: true,
        logging: true,
      });

      const user = res[0];

      if (user) {
        return {
          code: 200,
          data: {
            user,
          },
          msg: 'SCUCCESS',
        };
      }

      return {
        code: 200,
        msg: '查无此人',
      };
    } catch (error) {
      return {
        code: 503,
        msg: `Service error: ${error}`,
      };
    }
  }
}
