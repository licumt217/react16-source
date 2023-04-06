"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Util_1 = __importDefault(require("../utils/Util"));
const mysql_1 = __importDefault(require("../middlewares/mysql"));
/**
 * DAO基类
 */
class BaseDAO {
    connection = null;
    table_name = "";
    sql = "";
    /**
     * 获取数据库连接
     */
    getConn() {
        this.connection = mysql_1.default.getConnection();
        this.connection && this.connection.connect();
    }
    /**
     * 断开连接
     */
    end() {
        this.connection.end();
    }
    /**
     * SQL真正的执行方法
     * @param query sql 语句
     * @param params 参数
     * @returns
     */
    query(query, params) {
        return new Promise((resolve, reject) => {
            this.getConn();
            const queryAndParamsArray = [query];
            if (params) {
                queryAndParamsArray.push(params);
            }
            this.connection.query(...queryAndParamsArray, (err, result) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(result);
                }
            });
            this.end();
        });
    }
    /**
     * 重置SQL
     */
    reset() {
        this.sql = "";
    }
    /**
     * 构建select
     * @param property 字段或字段数组
     * @returns
     */
    select(property) {
        this.reset();
        if (Array.isArray(property)) {
            this.sql = ` select `;
            for (let i = 0; i < property.length; i++) {
                let singleProperty = property[i];
                if (singleProperty === "date" || singleProperty === "opDate") {
                    singleProperty = ` DATE_FORMAT(${singleProperty}, "%Y-%m-%d") ${singleProperty} `;
                }
                if (i === property.length - 1) {
                    this.sql += ` ${singleProperty} `;
                }
                else {
                    this.sql += ` ${singleProperty}, `;
                }
            }
        }
        else {
            if (property === "date" || property === "opDate") {
                property = ` DATE_FORMAT(${property}, "%Y-%m-%d") ${property} `;
            }
            this.sql = `select ${property} `;
        }
        this.sql += ` from ${this.table_name} `;
        return this;
    }
    /**
     * 构建delete语句
     * @returns
     */
    delete() {
        this.reset();
        this.sql += `delete from ${this.table_name} `;
        return this;
    }
    /**
     * 添加where 条件
     * @param whereStr 字符串形式或对象形式
     * @returns
     */
    where(whereStr) {
        if (Util_1.default.isString(whereStr)) {
            this.sql += ` where ${whereStr} `;
        }
        else {
            this.sql += ` where `;
            let strArray = [];
            for (let key in whereStr) {
                let value = whereStr[key];
                if (Util_1.default.isString(value)) {
                    value = Util_1.default.s(value);
                }
                strArray.push(` ${key}=${value} `);
            }
            this.sql += strArray.join(' and ');
        }
        return this;
    }
    /**
     * 继续添加where条件
     * @param whereStr
     * @returns
     */
    andWhere(whereStr) {
        if (Util_1.default.isString(whereStr)) {
            this.sql += ` and ${whereStr} `;
        }
        else {
            this.sql += ` and `;
            let strArray = [];
            for (let key in whereStr) {
                let value = whereStr[key];
                if (Util_1.default.isString(value)) {
                    value = Util_1.default.s(value);
                }
                strArray.push(` ${key}=${value} `);
            }
            this.sql += strArray.join(' and ');
        }
        return this;
    }
    /**
     * 继续添加where条件
     * @param whereStr
     * @returns
     */
    andWhereIn(property, paramsArray) {
        this.sql += ` and ${property} in ( `;
        for (let i = 0; i < paramsArray.length; i++) {
            this.sql += `${Util_1.default.s(paramsArray[i])},`;
        }
        this.sql = this.sql.slice(0, -1);
        this.sql += `) `;
        return this;
    }
    /**
     * 给where条件中的参数设置值
     * @param parameters 参数对象
     * @returns
     */
    setParameters(parameters) {
        for (let key in parameters) {
            let value = parameters[key];
            if (Util_1.default.isString(value)) {
                value = Util_1.default.s(value);
            }
            const replaceKey = `:${key}`;
            this.sql = this.sql.replace(replaceKey, value);
        }
        return this;
    }
    addOrderBy(property, sort) {
        this.sql += ` order by ${property} ${sort} `;
        return this;
    }
    andOrderBy(property, sort) {
        this.sql += ` , ${property} ${sort} `;
        return this;
    }
    limit(counts) {
        this.sql += ` limit ${counts} `;
        return this;
    }
    async execute() {
        return await this.query(this.sql, null);
    }
    /**
     * 根据实体插入
     * @param entity
     * @returns
     */
    async insert(entity) {
        this.sql = this.genInsertSqlByEntity(entity);
        return await this.execute();
    }
    /**
     * 根据实体返回插入的SQL语句
     * @param entity
     * @returns
     */
    genInsertSqlByEntity(entity) {
        let key_str = ``, value_str = ``;
        for (let key in entity) {
            const value = entity[key];
            if (value) {
                key_str += `${key},`;
                value_str += `${Util_1.default.s(value)},`;
            }
        }
        if (key_str) {
            key_str = key_str.slice(0, -1);
            value_str = value_str.slice(0, -1);
        }
        return `insert into ${this.table_name}(${key_str}) values(${value_str});`;
    }
    /**
     * 根据实体返回更新的SQL语句
     * @param entity
     * @returns
     */
    genUpdateSqlByEntity(entity) {
        const id = entity.id;
        let sql = ``, value_str = ``;
        for (let key in entity) {
            const value = entity[key];
            if (key !== 'id') {
                sql += `${key}=${Util_1.default.s(value)},`;
            }
        }
        if (sql) {
            sql = sql.slice(0, -1);
        }
        return `update ${this.table_name} set ${sql}) where id=${Util_1.default.s(id)};`;
    }
    distinct() {
        this.sql = this.sql.replace("select", "select distinct ");
        return this;
    }
    /**
     * 根据实体数组执行批量插入
     * @param entities
     * @returns
     */
    async batchInsert(entities) {
        let sql = "";
        for (let i = 0; i < entities.length; i++) {
            sql += this.genInsertSqlByEntity(entities[i]);
        }
        this.sql = sql;
        return await this.execute();
    }
    /**
     * 根据实体数组执行批量更新
     * @param entities
     * @returns
     */
    async batchSave(entities) {
        let sql = "";
        for (let i = 0; i < entities.length; i++) {
            sql += this.genUpdateSqlByEntity(entities[i]);
        }
        this.sql = sql;
        return await this.execute();
    }
}
exports.default = BaseDAO;
