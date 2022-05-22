import { Injectable } from '@nestjs/common';
import { QueryTypes, Sequelize } from 'sequelize';
import sequelize from 'src/database/sequelize';
import { makeSalt, encryptPassword } from 'src/utils/cryptogram';

@Injectable()
export class UserService {
  // 查找用户信息
  async findOne(userName: string): Promise<any | undefined> {
    const sql = `
      SELECT
        user_id userId, account_name userName, real_name realName, passwd password, passwd_salt salt, mobile, role
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

      // if (user) {
      //   return {
      //     code: 200,
      //     data: {
      //       user,
      //     },
      //     msg: 'SCUCCESS',
      //   };
      // }

      return user;
    } catch (error) {
      return undefined;
    }
  }
  // 注册
  async register(requestBody: any): Promise<any> {
    const { accountName, realName, password, repassword, mobile } = requestBody;
    if (password !== repassword) {
      return {
        code: 400,
        msg: '两次输入的密码不一致',
      };
    }
    const user = await this.findOne(accountName);
    if (user) {
      return {
        code: 400,
        msg: '用户已存在',
      };
    }
    const salt = makeSalt();
    const hashPwd = encryptPassword(password, salt);
    const registerSQL = `
      INSERT INTO admin_user(account_name, real_name, passwd, passwd_salt, mobile, user_status, role, create_by)
      VALUES ('${accountName}', '${realName}', '${hashPwd}', '${salt}', '${mobile}', 1, 3, 0)
    `;
    try {
      await sequelize.query(registerSQL, {logging: false});
      return {
        code: 200,
        msg: 'SUCCESS',
      };
    } catch (error) {
      return {
        code: 503,
        msg: `SERVICE ERROR:${error}`,
      };
    }
  }
}
