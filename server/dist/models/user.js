import { DataTypes, Model } from 'sequelize';
import bcrypt from 'bcrypt';
export class User extends Model {
    id;
    username;
    password;
    createdAt;
    updatedAt;
    async setPassword(password) {
        const saltRounds = 10;
        console.log('Hashing password:', password);
        this.password = await bcrypt.hash(password, saltRounds);
    }
    async validatePassword(password) {
        return bcrypt.compare(password, this.dataValues.password);
    }
}
export function UserFactory(sequelize) {
    User.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        tableName: 'users',
        sequelize,
        hooks: {
            beforeCreate: async (user) => {
                console.log('Before Create Hook:', user);
                if (user.password) {
                    await user.setPassword(user.password);
                    console.log('Hashed password before save:', user.password);
                }
                else {
                    console.log('No password provided during creation!');
                }
            },
            beforeUpdate: async (user) => {
                console.log('Before Update Hook:', user);
                if (user.password) {
                    await user.setPassword(user.password);
                    console.log('Hashed password before update:', user.password);
                }
                else {
                    console.log('No password provided during update!');
                }
            },
        }
    });
    return User;
}
